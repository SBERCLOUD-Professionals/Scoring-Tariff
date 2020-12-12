using System;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Scoring.EntityFrameworkCore;
using Volo.Abp.DependencyInjection;

namespace Scoring.Migrators
{
    [SuppressMessage("ReSharper", "UnusedMember.Global")]
    public class EfScoringDbSchemaMigrator : IScoringDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EfScoringDbSchemaMigrator(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the ScoringMigrationsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<ScoringMigrationsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}