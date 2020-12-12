using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Volo.Abp.Identity;
using Volo.Abp.Identity.Settings;
using Volo.Abp.ObjectExtending;
using Volo.Abp.Settings;
using Volo.Abp.Users;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace Scoring.Services
{
    public class ProfileAppService : ScoringAppService, IProfileAppService
    {
        public ProfileAppService(IdentityUserManager userManager)
        {
            UserManager = userManager;
        }

        private IdentityUserManager UserManager { get; }

        public async Task<ProfileDto> Get(CancellationToken ct)
        {
            return ObjectMapper.Map<IdentityUser, ProfileDto>(
                await UserManager.GetByIdAsync(CurrentUser.GetId())
            );
        }

        public async Task<ProfileDto> Update(UpdateProfileDto input, CancellationToken ct)
        {
            var user = await UserManager.GetByIdAsync(CurrentUser.GetId());

            if (await SettingProvider.IsTrueAsync(IdentitySettingNames.User.IsUserNameUpdateEnabled))
                (await UserManager.SetUserNameAsync(user, input.UserName)).CheckErrors();

            if (await SettingProvider.IsTrueAsync(IdentitySettingNames.User.IsEmailUpdateEnabled))
                (await UserManager.SetEmailAsync(user, input.Email)).CheckErrors();

            (await UserManager.SetPhoneNumberAsync(user, input.PhoneNumber)).CheckErrors();

            user.Name = input.Name;
            user.Surname = input.Surname;

            input.MapExtraPropertiesTo(user);

            (await UserManager.UpdateAsync(user)).CheckErrors();

            await CurrentUnitOfWork.SaveChangesAsync(ct);

            return ObjectMapper.Map<IdentityUser, ProfileDto>(user);
        }

        public async Task ChangePassword(ChangePasswordInput input, CancellationToken ct)
        {
            var currentUser = await UserManager.GetByIdAsync(CurrentUser.GetId());
            (await UserManager.ChangePasswordAsync(currentUser, input.CurrentPassword, input.NewPassword))
                .CheckErrors();
        }
    }
}