using System;
using System.Diagnostics.CodeAnalysis;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Scoring.Settings;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace Scoring
{
    [DependsOn(
        typeof(ScoringDomainModule),
        typeof(ScoringAppContractsModule),
        typeof(ScoringEmailingModule)
    )]
    public class ScoringCoreAppModule : AbpModule
    {
        [SuppressMessage("ReSharper", "ArgumentsStyleOther")]
        [SuppressMessage("ReSharper", "ArgumentsStyleNamedExpression")]
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            base.PreConfigureServices(context);

            // Auth:Jwt
            var configuration = context.Services.GetConfiguration();
            var authJwtSection = configuration.GetSection("Auth:Jwt");
            var expirationDays = int.TryParse(authJwtSection["ExpirationDays"], out var expDays) ? expDays : 60;
            var requireHttpsMetadata = bool.TryParse(authJwtSection["RequireHttpsMetadata"], out var r) && r;
            var authJwtSettings = new AuthJwtSettings(
                issuer: authJwtSection["Issuer"],
                audience: authJwtSection["Audience"],
                securityKey: new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authJwtSection["SecurityKey"])),
                expirationDays: TimeSpan.FromDays(expirationDays),
                requireHttpsMetadata: requireHttpsMetadata);
            context.Services.AddSingleton(authJwtSettings);
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options => { options.AddMaps<ScoringCoreAppModule>(); });
        }
    }
}