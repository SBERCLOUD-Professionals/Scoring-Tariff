using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringCoreAppModule)
    )]
    public class ScoringMultiTenancyAppModule : AbpModule
    {
        
        public const string RootPath = "multiTenancy";
        
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options => { options.AddMaps<ScoringMultiTenancyAppModule>(); });
        }
    }
}