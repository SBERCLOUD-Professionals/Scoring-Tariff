using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace Scoring.EntityFrameworkCore
{
    [DependsOn(
        typeof(ScoringEntityFrameworkCoreModule)
    )]
    public class EfScoringDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<ScoringMigrationsDbContext>();
        }
    }
}