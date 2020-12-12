using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Scoring.Dto;
using Scoring.Providers;
using Volo.Abp;
using Volo.Abp.Data;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.TenantManagement;

namespace Scoring.Services
{
    [SuppressMessage("ReSharper", "UnusedType.Global")]
    public class RegistrationAppService : ScoringAppService, IRegistrationAppService
    {
        public RegistrationAppService(
            ITenantRepository tenantRepository,
            ITenantManager tenantManager,
            IDataFilter dataFilter,
            IdentityUserManager userManager,
            IAuthJwtProvider authJwtProvider,
            IDataSeeder dataSeeder)
        {
            TenantRepository = tenantRepository;
            TenantManager = tenantManager;
            DataFilter = dataFilter;
            UserManager = userManager;
            AuthJwtProvider = authJwtProvider;
            DataSeeder = dataSeeder;
        }

        private ITenantRepository TenantRepository { get; }
        private ITenantManager TenantManager { get; }
        private IdentityUserManager UserManager { get; }
        private IAuthJwtProvider AuthJwtProvider { get; }
        private IDataSeeder DataSeeder { get; }

        private IDataFilter DataFilter { get; }

        [AllowAnonymous]
        public async Task<LookupTenantByNameResult> LookupByName(LookupTenantByNameInput input, CancellationToken ct)
        {
            var tenant = await TenantRepository.FindByNameAsync(input.TenancyName, false, ct);
            if (tenant == null) return new LookupTenantByNameResult(false);
            return tenant.IsDeleted
                ? new LookupTenantByNameResult(false)
                : new LookupTenantByNameResult(true, tenant.Id);
        }

        [AllowAnonymous]
        public async Task<RegisterTenantResult> Create(RegisterTenantInput input, CancellationToken ct)
        {
            using (DataFilter.Disable<IMultiTenant>())
            {
                var existsTenant = await TenantRepository.FindByNameAsync(input.Name, false, ct);
                if (existsTenant != null)
                    throw new BusinessException(ScoringDomainErrorCodes.TenantAlreadyExists)
                        .WithData("name", input.Name);
            }

            // Create tenant
            var tenant = await TenantManager.CreateAsync(input.Name);
            tenant = await TenantRepository.InsertAsync(tenant, true, ct);
            IdentityUser adminIdentity;
            using (CurrentTenant.Change(tenant.Id))
            {
                await DataSeeder.SeedAsync(
                    new DataSeedContext(tenant.Id)
                        .WithProperty("AdminEmail", input.AdminEmailAddress)
                        .WithProperty("AdminPassword", input.AdminPassword)
                );

                adminIdentity = await UserManager.FindByEmailAsync(input.AdminEmailAddress);
            }

            var adminTokenDto = new RegisterAdminTokenDto(await AuthJwtProvider.GenerateJwt(adminIdentity, ct));
            var tenantDto = ObjectMapper.Map<Tenant, TenantDto>(tenant);

            return new RegisterTenantResult(adminTokenDto, tenantDto);
        }
    }
}