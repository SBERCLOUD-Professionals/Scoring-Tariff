using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Volo.Abp;

#if DEBUG
[assembly: UserSecretsId("D5BE72B3-D5E8-4AB6-A8FF-9B835AA95729")]
#endif

namespace Scoring
{
    public class DbMigratorHostedService : IHostedService
    {
        private readonly IHostApplicationLifetime _hostApplicationLifetime;

        public DbMigratorHostedService(IHostApplicationLifetime hostApplicationLifetime)
        {
            _hostApplicationLifetime = hostApplicationLifetime;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var application = AbpApplicationFactory.Create<ScoringDbMigratorModule>(options =>
            {
                options.UseAutofac();
                options.Services.AddLogging(c => c.AddSerilog());
#if DEBUG
                options.Configuration.EnvironmentName = "Development";
                options.Configuration.UserSecretsAssembly = typeof(DbMigratorHostedService).Assembly;
#endif
            }))
            {
                application.Initialize();

                await application
                    .ServiceProvider
                    .GetRequiredService<ScoringDbMigrationService>()
                    .MigrateAsync();

                application.Shutdown();

                _hostApplicationLifetime.StopApplication();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}