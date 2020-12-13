using System;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Volo.Abp;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Uow;

namespace Scoring.Seeders
{
    [Dependency(ReplaceServices = true)]
    [ExposeServices(typeof(IIdentityDataSeeder))]
    [SuppressMessage("ReSharper", "UnusedMember.Global")]
    internal class AppIdentityDataSeeder : IIdentityDataSeeder, ITransientDependency
    {
        protected IGuidGenerator GuidGenerator { get; }
        protected IIdentityRoleRepository RoleRepository { get; }
        protected IIdentityUserRepository UserRepository { get; }
        protected ILookupNormalizer LookupNormalizer { get; }
        protected IdentityUserManager UserManager { get; }
        protected IdentityRoleManager RoleManager { get; }

        protected IPermissionDefinitionManager PermissionDefinitionManager { get; }
        private IPermissionManager PermissionManager { get; }
        protected ICurrentTenant CurrentTenant { get; }

        public AppIdentityDataSeeder(
            IGuidGenerator guidGenerator,
            IIdentityRoleRepository roleRepository,
            IIdentityUserRepository userRepository,
            ILookupNormalizer lookupNormalizer,
            IdentityUserManager userManager,
            IdentityRoleManager roleManager,
            ICurrentTenant currentTenant,
            IPermissionDefinitionManager permissionDefinitionManager,
            IPermissionManager permissionManager)
        {
            GuidGenerator = guidGenerator;
            RoleRepository = roleRepository;
            UserRepository = userRepository;
            LookupNormalizer = lookupNormalizer;
            UserManager = userManager;
            RoleManager = roleManager;
            CurrentTenant = currentTenant;
            PermissionDefinitionManager = permissionDefinitionManager;
            PermissionManager = permissionManager;
        }

        [UnitOfWork]
        public async Task<IdentityDataSeedResult> SeedAsync(string adminEmail, string adminPassword, Guid? tenantId)
        {
            Check.NotNullOrWhiteSpace(adminEmail, nameof(adminEmail));
            Check.NotNullOrWhiteSpace(adminPassword, nameof(adminPassword));

            var result = new IdentityDataSeedResult();

            using (CurrentTenant.Change(tenantId))
            {
                //"admin" user
                const string adminUserName = "admin";
                var adminUser = await UserRepository.FindByNormalizedUserNameAsync(
                    LookupNormalizer.NormalizeName(adminUserName)
                );

                if (adminUser != null) return result;

                adminUser = new IdentityUser(GuidGenerator.Create(), adminUserName, adminEmail, tenantId)
                {
                    Name = adminUserName
                };

                (await UserManager.CreateAsync(adminUser, adminPassword)).CheckErrors();
                result.CreatedAdminUser = true;

                var adminRole = await RoleRepository.FindByNormalizedNameAsync(
                    LookupNormalizer.NormalizeName(ScoringRoleNames.Admin)
                );
                if (adminRole == null)
                {
                    adminRole = new IdentityRole(GuidGenerator.Create(), ScoringRoleNames.Admin, tenantId)
                    {
                        IsStatic = true,
                        IsPublic = false
                    };

                    (await RoleManager.CreateAsync(adminRole)).CheckErrors();
                    result.CreatedAdminRole = true;
                }

                (await UserManager.AddToRoleAsync(adminUser, ScoringRoleNames.Admin)).CheckErrors();
                var multiTenancySides = CurrentTenant.GetMultiTenancySide();
                await GrantedAllPermissionsToAdminUser(adminUser, multiTenancySides);
                return result;
            }
        }

        private async Task GrantedAllPermissionsToAdminUser(IdentityUser adminUser, MultiTenancySides multiTenancySides)
        {
            foreach (var permission in PermissionDefinitionManager.GetPermissions())
            {
                if (permission.MultiTenancySide != multiTenancySides) continue;
                await PermissionManager.SetForUserAsync(adminUser.Id, permission.Name, true);
            }
        }
    }
}