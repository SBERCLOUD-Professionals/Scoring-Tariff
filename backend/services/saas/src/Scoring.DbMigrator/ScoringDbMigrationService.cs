using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Scoring.Migrators;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MultiTenancy;
using Volo.Abp.TenantManagement;

namespace Scoring
{
    public class ScoringDbMigrationService : ITransientDependency
    {
        private readonly IConfiguration _configuration;
        private readonly ICurrentTenant _currentTenant;

        private readonly IDataSeeder _dataSeeder;
        private readonly IEnumerable<IScoringDbSchemaMigrator> _dbSchemaMigrators;
        private readonly ITenantRepository _tenantRepository;

        public ScoringDbMigrationService(
            IDataSeeder dataSeeder,
            IEnumerable<IScoringDbSchemaMigrator> dbSchemaMigrators,
            ITenantRepository tenantRepository,
            ICurrentTenant currentTenant,
            IConfiguration configuration)
        {
            _dataSeeder = dataSeeder;
            _dbSchemaMigrators = dbSchemaMigrators;
            _tenantRepository = tenantRepository;
            _currentTenant = currentTenant;
            _configuration = configuration;

            Logger = NullLogger<ScoringDbMigrationService>.Instance;
        }

        public ILogger<ScoringDbMigrationService> Logger { get; set; }

        public async Task MigrateAsync()
        {
            Logger.LogInformation("Started database migrations...");

            await MigrateDatabaseSchemaAsync();
            await SeedDataAsync();

            Logger.LogInformation("Successfully completed host database migrations.");

            var tenants = await _tenantRepository.GetListAsync(includeDetails: true);

            var migratedDatabaseSchemas = new HashSet<string>();
            foreach (var tenant in tenants)
            {
                using (_currentTenant.Change(tenant.Id))
                {
                    if (tenant.ConnectionStrings.Any())
                    {
                        var tenantConnectionStrings = tenant.ConnectionStrings
                            .Select(x => x.Value)
                            .ToList();

                        if (!migratedDatabaseSchemas.IsSupersetOf(tenantConnectionStrings))
                        {
                            await MigrateDatabaseSchemaAsync(tenant);

                            migratedDatabaseSchemas.AddIfNotContains(tenantConnectionStrings);
                        }
                    }

                    await SeedDataAsync(tenant);
                }

                Logger.LogInformation($"Successfully completed {tenant.Name} tenant database migrations.");
            }

            Logger.LogInformation("Successfully completed database migrations.");
        }

        private async Task MigrateDatabaseSchemaAsync(Tenant? tenant = null)
        {
            Logger.LogInformation(
                $"Migrating schema for {(tenant == null ? "host" : tenant.Name + " tenant")} database...");

            foreach (var migrator in _dbSchemaMigrators) await migrator.MigrateAsync();
        }

        private async Task SeedDataAsync(Tenant? tenant = null)
        {
            Logger.LogInformation($"Executing {(tenant == null ? "host" : tenant.Name + " tenant")} database seed...");

            var adminEmail = _configuration["Admin:Email"] ?? "admin@scoring.com";
            var adminPassword = _configuration["Admin:Password"] ?? "1q2w3E*";
            var context = new DataSeedContext(tenant?.Id)
                .WithProperty("AdminEmail", adminEmail)
                .WithProperty("AdminPassword", adminPassword);
            await _dataSeeder.SeedAsync(context);
        }
    }
}