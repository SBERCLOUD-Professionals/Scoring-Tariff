using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.UserSecrets;

#if DEBUG
[assembly: UserSecretsId("D5BE72B3-D5E8-4AB6-A8FF-9B835AA95729")]
#endif

namespace Scoring.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class ScoringMigrationsDbContextFactory : IDesignTimeDbContextFactory<ScoringMigrationsDbContext>
    {
        public ScoringMigrationsDbContext CreateDbContext(string[] args)
        {
            ScoringEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<ScoringMigrationsDbContext>()
                .UseNpgsql(configuration.GetConnectionString("Default"));

            return new ScoringMigrationsDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../Scoring.DbMigrator/"))
                .AddJsonFile("appsettings.json", false);
#if DEBUG
            builder.AddUserSecrets<ScoringMigrationsDbContextFactory>();
#else
            builder.AddEnvironmentVariables();
#endif
            return builder.Build();
        }
    }
}