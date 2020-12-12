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
            DefineExercises(context);
            DefineExerciseCategories(context);
            DefineExerciseForms(context);
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ScoringResource>(name);
        }

        private static void DefineExercises(IPermissionDefinitionContext context)
        {
            var group = context.AddGroup(ScoringPermissions.Exercises.Group, 
                L($"Permission:{ScoringPermissions.Exercises.Group}"), MultiTenancySides.Tenant);
            var permission = group.AddPermission(ScoringPermissions.Exercises.Self, 
                L($"Permission:{ScoringPermissions.Exercises.Self}"), MultiTenancySides.Tenant);
            
            DefineGroupCrud(permission, ScoringPermissions.Exercises.Crud());
        }

        private static void DefineExerciseCategories(IPermissionDefinitionContext context)
        {
            var group = context.AddGroup(ScoringPermissions.ExerciseCategories.Group,
                L($"Permission:{ScoringPermissions.ExerciseCategories.Group}"), MultiTenancySides.Tenant);
            var permission = group.AddPermission(ScoringPermissions.ExerciseCategories.Self,
                L($"Permission:{ScoringPermissions.ExerciseCategories.Self}"), MultiTenancySides.Tenant);

            DefineGroupCrud(permission, ScoringPermissions.ExerciseCategories.Crud());
        }

        private static void DefineExerciseForms(IPermissionDefinitionContext context)
        {
            var group = context.AddGroup(ScoringPermissions.ExerciseForms.Group,
                L($"Permission:{ScoringPermissions.ExerciseForms.Group}"), MultiTenancySides.Tenant);
            var permission = group.AddPermission(ScoringPermissions.ExerciseForms.Self,
                L($"Permission:{ScoringPermissions.ExerciseForms.Self}"), MultiTenancySides.Tenant);

            DefineGroupCrud(permission, ScoringPermissions.ExerciseForms.Crud());
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