using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Scoring.Dto;
using Scoring.Emailing;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.Account.Localization;
using Volo.Abp.Identity;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace Scoring.Services
{
    public class ResetPasswordService : ScoringAppService, IResetPasswordService
    {
        public ResetPasswordService(
            IdentityUserManager userManager,
            IAccountMailer accountMailer,
            IdentitySecurityLogManager identitySecurityLogManager)
        {
            AccountMailer = accountMailer;
            IdentitySecurityLogManager = identitySecurityLogManager;
            UserManager = userManager;
            LocalizationResource = typeof(AccountResource);
        }

        private IdentityUserManager UserManager { get; }
        private IAccountMailer AccountMailer { get; }
        private IdentitySecurityLogManager IdentitySecurityLogManager { get; }

        [AllowAnonymous]
        public async Task SendToken(SendPasswordResetCodeInput input, CancellationToken ct)
        {
            var user = await GetUserByEmail(input.Email, ct);
            var resetToken = await UserManager.GeneratePasswordResetTokenAsync(user);
            await AccountMailer.SendResetPasswordLink(user, resetToken, input.AppName, input.ReturnUrl,
                input.ReturnUrlHash, ct);
        }

        [AllowAnonymous]
        public async Task Confirm(ResetPasswordDto input, CancellationToken ct)
        {
            var user = await UserManager.GetByIdAsync(input.UserId);
            (await UserManager.ResetPasswordAsync(user, input.ResetToken, input.Password)).CheckErrors();

            await IdentitySecurityLogManager.SaveAsync(new IdentitySecurityLogContext
            {
                Identity = IdentitySecurityLogIdentityConsts.Identity,
                Action = IdentitySecurityLogActionConsts.ChangePassword
            });
        }

        protected virtual async Task<IdentityUser> GetUserByEmail(string email, CancellationToken ct)
        {
            var user = await UserManager.FindByEmailAsync(email);
            if (user == null) throw new UserFriendlyException(L["Volo.Account:InvalidEmailAddress", email]);

            return user;
        }
    }
}