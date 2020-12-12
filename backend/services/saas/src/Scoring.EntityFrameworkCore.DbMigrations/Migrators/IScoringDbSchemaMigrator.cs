using System.Threading.Tasks;

namespace Scoring.Migrators
{
    public interface IScoringDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}