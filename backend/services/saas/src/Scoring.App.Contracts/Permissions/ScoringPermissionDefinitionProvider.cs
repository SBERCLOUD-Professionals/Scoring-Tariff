using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Scoring.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace Scoring.Permissions
{
    [SuppressMessage("ReSharper", "UnusedMember.Global")]
    public class ScoringPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            DefineTariff(context);
        }

        private static void DefineTariff(IPermissionDefinitionContext context)
        {
            var group = context.AddGroup(ScoringPermissions.Tariff.Group,
                L($"Permission:{ScoringPermissions.Tariff.Group}"), MultiTenancySides.Tenant);
            var permission = group.AddPermission(ScoringPermissions.Tariff.Self,
                L($"Permission:{ScoringPermissions.Tariff.Self}"), MultiTenancySides.Tenant);
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ScoringResource>(name);
        }

        private static void DefineGroupCrud(PermissionDefinition parentPermission, IEnumerable<string> crudNames)
        {
            foreach (var crudName in crudNames)
            {
                parentPermission.AddChild(crudName, L($"Permission:{crudName}"), MultiTenancySides.Tenant);
            }
        }
    }
}