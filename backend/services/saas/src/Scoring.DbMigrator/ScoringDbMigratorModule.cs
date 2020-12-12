using Scoring.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(EfScoringDbMigrationsModule),
        typeof(ScoringAppContractsModule)
    )]
    public class ScoringDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}