using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringCoreAppModule)
    )]
    public class ScoringTariffAppModule : AbpModule
    {
        
        public const string RootPath = "tariff";
        
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options => { options.AddMaps<ScoringTariffAppModule>(); });
        }
    }
}