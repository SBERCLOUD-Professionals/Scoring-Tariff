using DotNetCore.CAP;
using Events.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Service.Contracts;
using StackExchange.Redis;

namespace Events
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddSignalR();

            services.AddCap(x =>
            {
                x.UseInMemoryStorage();
                x.UseKafka(Configuration.GetConnectionString("Kafka"));
            });

            services.AddDataProtection()
                .PersistKeysToStackExchangeRedis(
                    ConnectionMultiplexer.Connect(Configuration.GetConnectionString("Redis")))
                .SetApplicationName(DataProtection.AppName);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseRouting();

            app.UseCors();

            app.UseEndpoints(endpoints => { endpoints.MapHub<EventsHub>("/eventsHub"); });

            app.UseCapDashboard();
        }
    }
}