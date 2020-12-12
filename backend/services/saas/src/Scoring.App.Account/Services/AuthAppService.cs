using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Scoring.Dto;
using Scoring.Providers;
using Volo.Abp;
using Volo.Abp.Data;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;

namespace Scoring.Services
{
    public class AuthAppService : ScoringAppService, IAuthAppService
    {
        public AuthAppService(IAuthJwtProvider authJwtProvider, IdentityUserManager userManager, IDataFilter dataFilter)
        {
            AuthJwtProvider = authJwtProvider;
            UserManager = userManager;
            DataFilter = dataFilter;
        }

        private IdentityUserManager UserManager { get; }
        private IAuthJwtProvider AuthJwtProvider { get; }
        private IDataFilter DataFilter { get; }

        [AllowAnonymous]
        public async Task<AuthenticateResult> Authenticate(AuthenticateInput input, CancellationToken ct)
        {
            using (DataFilter.Disable<IMultiTenant>())
            {
                var identityUser = await UserManager.FindByEmailAsync(input.UsernameOrEmail)
                                   ?? await UserManager.FindByNameAsync(input.UsernameOrEmail);
                if (!await UserManager.CheckPasswordAsync(identityUser, input.Password))
                    throw new BusinessException(ScoringDomainErrorCodes.AuthenticateFailed);

                if (identityUser == null)
                    throw new BusinessException(ScoringDomainErrorCodes.AuthenticateFailed);
                var accessToken = await AuthJwtProvider.GenerateJwt(identityUser, ct);

                return new AuthenticateResult(accessToken, AuthJwtProvider.JwtSettings.ExpirationDays.TotalSeconds);
            }
        }
    }
}