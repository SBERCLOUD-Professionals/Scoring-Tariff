using System.Diagnostics.CodeAnalysis;
using Scoring.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.TextTemplating;

namespace Scoring
{
    [SuppressMessage("ReSharper", "RedundantExtendsListEntry")]
    internal class EmailingTemplateDefinitionProvider : TemplateDefinitionProvider, ITransientDependency
    {
        public override void Define(ITemplateDefinitionContext context)
        {
            context.Add(new TemplateDefinition(
                    EmailingTemplates.ResetPasswordLink,
                    layout: EmailingTemplates.Layout,
                    localizationResource: typeof(EmailingResource),
                    defaultCultureName: ScoringConsts.Localization.DefaultCulture
                ).WithVirtualFilePath($"{ScoringConsts.VirtualFiles.RootPath}/Templates/ResetPasswordLink.tpl", true)
            );

            context.Add(new TemplateDefinition(
                    EmailingTemplates.Layout,
                    isLayout: true,
                    localizationResource: typeof(EmailingResource),
                    defaultCultureName: ScoringConsts.Localization.DefaultCulture
                ).WithVirtualFilePath($"{ScoringConsts.VirtualFiles.RootPath}/Templates/EmailLayout.tpl", true)
            );
        }
    }
}