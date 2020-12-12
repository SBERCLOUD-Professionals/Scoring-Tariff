using Scoring.Localization;
using Volo.Abp.Emailing;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringDomainModule),
        typeof(AbpEmailingModule)
    )]
    public class ScoringEmailingModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
// #if DEBUG
//            context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
// #endif

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Add<EmailingResource>(ScoringConsts.Localization.DefaultCulture)
                    .AddVirtualJson($"{ScoringConsts.VirtualFiles.RootPath}/Localization/Resources");
            });

            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<ScoringEmailingModule>();
            });
        }
    }
}