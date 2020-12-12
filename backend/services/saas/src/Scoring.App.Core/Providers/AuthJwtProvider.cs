using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Scoring.Settings;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.Timing;

namespace Scoring.Providers
{
    [SuppressMessage("ReSharper", "UnusedType.Global")]
    internal class AuthJwtProvider : IAuthJwtProvider, ITransientDependency
    {
        public AuthJwtProvider(Microsoft.AspNetCore.Identity.IUserClaimsPrincipalFactory<IdentityUser> claimsFactory,
            AuthJwtSettings jwtSettings, IdentityUserManager userManager, IClock clock, IGuidGenerator guidGenerator)
        {
            ClaimsFactory = claimsFactory;
            JwtSettings = jwtSettings;
            UserManager = userManager;
            Clock = clock;
            GuidGenerator = guidGenerator;
        }

        private IClock Clock { get; }
        private IdentityUserManager UserManager { get; }
        private IGuidGenerator GuidGenerator { get; }
        private Microsoft.AspNetCore.Identity.IUserClaimsPrincipalFactory<IdentityUser> ClaimsFactory { get; }
        public AuthJwtSettings JwtSettings { get; }

        [SuppressMessage("ReSharper", "ArgumentsStyleNamedExpression")]
        [SuppressMessage("ReSharper", "ArgumentsStyleOther")]
        public async Task<string> GenerateJwt(IdentityUser user, CancellationToken ct)
        {
            var claimsPrincipal = await ClaimsFactory.CreateAsync(user);
            var claims = claimsPrincipal.Claims?.ToList() ?? new List<Claim>();
            var userClaims = await UserManager.GetClaimsAsync(user);
            if (userClaims != null) claims.AddRange(userClaims);
            var customClaims = user.Claims?.Select(x => x.ToClaim()).ToList();
            if (customClaims != null) claims.AddRange(customClaims);
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, GuidGenerator.Create().ToString()));

            var token = new JwtSecurityToken(
                issuer: JwtSettings.Issuer,
                audience: JwtSettings.Audience,
                claims: claims,
                expires: Clock.Now.Add(JwtSettings.ExpirationDays),
                signingCredentials: JwtSettings.SigningCredentials);

            var jwtHandler = new JwtSecurityTokenHandler
            {
                MapInboundClaims = false
            };

            return jwtHandler.WriteToken(token);
        }
    }
}