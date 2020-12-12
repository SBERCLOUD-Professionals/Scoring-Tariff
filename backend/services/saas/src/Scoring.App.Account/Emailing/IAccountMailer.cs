using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace Scoring.Emailing
{
    public interface IAccountMailer
    {
        Task SendResetPasswordLink(IdentityUser user, string resetToken, string appName, 
            string? returnUrl = null, string? returnUrlHash = null, CancellationToken ct = default);
    }
}