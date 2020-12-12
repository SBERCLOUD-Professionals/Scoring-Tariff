using Scoring.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(EfScoringTestModule)
    )]
    public class ScoringDomainTestModule : AbpModule
    {
    }
}