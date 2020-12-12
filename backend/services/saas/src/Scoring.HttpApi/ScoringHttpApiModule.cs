using Scoring.Localization;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringAppContractsModule),
        typeof(AbpAspNetCoreMvcModule)
    )]
    public class ScoringHttpApiModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            ConfigureLocalization();
        }

        private void ConfigureLocalization()
        {
            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Get<ScoringResource>();
            });
        }
    }
}