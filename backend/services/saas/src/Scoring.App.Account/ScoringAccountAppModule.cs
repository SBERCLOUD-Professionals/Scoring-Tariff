using Scoring.Options;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringCoreAppModule)
    )]
    public class ScoringAccountAppModule : AbpModule
    {
        public const string RootPath = "account";

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options => { options.AddMaps<ScoringAccountAppModule>(); });

            Configure<AppUrlOptions>(options =>
            {
                options.Applications["web"].Urls[AccountUrlNames.ResetPassword] = "account/resetPassword/confirm";
            });
        }
    }
}