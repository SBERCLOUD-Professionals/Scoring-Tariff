using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Scoring.Migrators
{
    /* This is used if database provider does't define
     * IScoringDbSchemaMigrator implementation.
     */
    public class NullScoringDbSchemaMigrator : IScoringDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}