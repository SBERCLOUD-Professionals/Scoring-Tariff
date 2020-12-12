using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringAbpAppModule),
        typeof(ScoringDomainTestModule)
    )]
    public class ScoringAbpAppTestModule : AbpModule
    {
    }
}