using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Volo.Abp;

namespace Scoring.EntityFrameworkCore
{
    public static class ScoringDbContextModelCreatingExtensions
    {
        public static void ConfigureScoring(this ModelBuilder builder, DatabaseFacade database)
        {
            Check.NotNull(builder, nameof(builder));
            Check.NotNull(database, nameof(database));
        }
    }
}