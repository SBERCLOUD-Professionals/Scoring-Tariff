using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Volo.Abp.MultiTenancy;
using Volo.Abp.Security.Claims;

namespace Scoring.TenantResolvers
{
    public class JwtTenantResolveContributor : TenantResolveContributorBase
    {
        private const string AuthorizationHeader = "Authorization";

        public override string Name => "Jwt";

        public override void Resolve(ITenantResolveContext context)
        {
            if (context.Handled) return;
            var httpAccessor = context.ServiceProvider.GetService(typeof(IHttpContextAccessor)) as IHttpContextAccessor;
            if (httpAccessor?.HttpContext == null) return;
            var request = httpAccessor.HttpContext.Request;

            if (!request.Headers.ContainsKey(AuthorizationHeader)) return;
            var bearerAccessToken = request.Headers.First(x => x.Key == AuthorizationHeader).Value.ToString();
            if (HasErrorsAuthorizationValue(bearerAccessToken)) return;
            if (!AuthenticationHeaderValue.TryParse(bearerAccessToken, out var rawAccessToken)) return;

            var handler = new JwtSecurityTokenHandler();
            var accessToken = handler.ReadJwtToken(rawAccessToken.Parameter);
            var tenantClaim = accessToken.Claims.FirstOrDefault(x => x.Type == AbpClaimTypes.TenantId);
            if (tenantClaim == null) return;

            context.TenantIdOrName = tenantClaim.Value;
        }

        private static bool HasErrorsAuthorizationValue(string rawAuthValue)
        {
            if (string.IsNullOrWhiteSpace(rawAuthValue)) return true;
            return rawAuthValue == "null" || rawAuthValue == "undefined";
        }
    }
}