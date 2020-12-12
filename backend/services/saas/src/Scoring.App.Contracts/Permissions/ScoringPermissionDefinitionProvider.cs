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