using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringCoreAppModule)
    )]
    public class ScoringAbpAppModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options => { options.AddMaps<ScoringAbpAppModule>(); });
        }
    }
}