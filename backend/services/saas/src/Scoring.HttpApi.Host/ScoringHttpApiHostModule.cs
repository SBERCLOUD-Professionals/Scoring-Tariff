using System;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Scoring.EntityFrameworkCore;
using Scoring.MultiTenancy;
using Scoring.Settings;
using Scoring.Swagger;
using Scoring.TenantResolvers;
using StackExchange.Redis;
using Swashbuckle.AspNetCore.SwaggerUI;
using Volo.Abp;
using Volo.Abp.AspNetCore.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Autofac;
using Volo.Abp.Caching;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringHttpApiModule),
        typeof(AbpAutofacModule),
        typeof(AbpCachingStackExchangeRedisModule),
        typeof(AbpAspNetCoreMultiTenancyModule),
        typeof(EfScoringDbMigrationsModule),
        typeof(AbpAspNetCoreSerilogModule),
        typeof(ScoringCoreAppModule),
        typeof(ScoringAbpAppModule),
        typeof(ScoringMultiTenancyAppModule),
        typeof(ScoringAccountAppModule)
    )]
    public class ScoringHttpApiHostModule : AbpModule
    {
        private const string DefaultCorsPolicyName = "Default";

        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            base.PreConfigureServices(context);

            // We customize the claims
            PreConfigure<IdentityBuilder>(builder =>
            {
                builder.AddDefaultTokenProviders();
            });
        }
        
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();
            var hostingEnvironment = context.Services.GetHostingEnvironment();

            ConfigureCsrfServices(context);
            ConfigureConventionalControllers();
            ConfigureAuthentication(context);
            ConfigureLocalization();
            ConfigureCache(configuration);
            ConfigureVirtualFileSystem(context);
            ConfigureRedis(context, configuration, hostingEnvironment);
            ConfigureCors(context, configuration);
            ConfigureSwaggerServices(context);
            ConfigureMultiTenancyServices(context);
        }

        private void ConfigureMultiTenancyServices(ServiceConfigurationContext context)
        {
            Configure<AbpTenantResolveOptions>(options =>
            {
                options.TenantResolvers.Add(new JwtTenantResolveContributor());
            });
        }

        private void ConfigureCache(IConfiguration configuration)
        {
            Configure<AbpDistributedCacheOptions>(options => { options.KeyPrefix = "Scoring:"; });
        }

        private void ConfigureVirtualFileSystem(ServiceConfigurationContext context)
        {
        }

        private void ConfigureConventionalControllers()
        {
            Configure<AbpAspNetCoreMvcOptions>(options =>
            {
                options.ConventionalControllers.Create(typeof(ScoringAbpAppModule).Assembly);
                options.ConventionalControllers.Create(typeof(ScoringMultiTenancyAppModule).Assembly,
                    o => o.RootPath = ScoringMultiTenancyAppModule.RootPath);
                options.ConventionalControllers.Create(typeof(ScoringAccountAppModule).Assembly,
                    o => { o.RootPath = ScoringAccountAppModule.RootPath; });
            });
        }
        
        private static void ConfigureCsrfServices(ServiceConfigurationContext context)
        {
            context.Services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");
        }

        private static void ConfigureAuthentication(ServiceConfigurationContext context)
        {
            var authJwtSettings = context.Services.GetSingletonInstance<AuthJwtSettings>();
            context.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = authJwtSettings.RequireHttpsMetadata;
                    options.Audience = authJwtSettings.Audience;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authJwtSettings.Issuer,
                        ValidateLifetime = true,
                        ValidateAudience = true,
                        ValidAudience = authJwtSettings.Audience,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = authJwtSettings.SecurityKey
                    };
                });
        }

        private static void ConfigureSwaggerServices(ServiceConfigurationContext context)
        {
            context.Services.AddTransient<IConfigureOptions<SwaggerUIOptions>, AppSwaggerUIOptions>();
            context.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo {Title = "Scoring API", Version = "v1"});
                options.DocInclusionPredicate((docName, description) => true);
                // Define the BearerAuth scheme that's in use
                options.AddSecurityDefinition("Auth", new OpenApiSecurityScheme()
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });
            });
        }

        private void ConfigureLocalization()
        {
            Configure<AbpLocalizationOptions>(options =>
            {
                options.Languages.Add(new LanguageInfo("en", "en", "English"));
                options.Languages.Add(new LanguageInfo("ru", "ru", "Русский"));
            });
        }

        private void ConfigureRedis(
            ServiceConfigurationContext context,
            IConfiguration configuration,
            IWebHostEnvironment hostingEnvironment)
        {
            if (!hostingEnvironment.IsDevelopment())
            {
                var redis = ConnectionMultiplexer.Connect(configuration["Redis:Configuration"]);
                context.Services
                    .AddDataProtection()
                    .PersistKeysToStackExchangeRedis(redis, "Scoring-Protection-Keys");
            }
        }

        private void ConfigureCors(ServiceConfigurationContext context, IConfiguration configuration)
        {
            context.Services.AddCors(options =>
            {
                options.AddPolicy(DefaultCorsPolicyName, builder =>
                {
                    var corsOrigins = configuration["App:CorsOrigins"];
                    if (corsOrigins == "*")
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    else
                        builder
                            .WithOrigins(corsOrigins.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(o => o.RemovePostFix("/")).ToArray())
                            .WithAbpExposedHeaders()
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                });
            });
        }

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();
            var env = context.GetEnvironment();

            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseAbpRequestLocalization(options =>
            {
                options.DefaultRequestCulture = new RequestCulture(ScoringConsts.Culture.Default);
            });

            app.UseRequestLocalization();
            
            app.UseCorrelationId();
            app.UseVirtualFiles();
            app.UseRouting();
            app.UseCors(DefaultCorsPolicyName);
            app.UseAuthentication();

            if (MultiTenancyConsts.IsEnabled) app.UseMultiTenancy();

            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseAuditing();
            app.UseAbpSerilogEnrichers();
            app.UseConfiguredEndpoints();
        }
    }
}