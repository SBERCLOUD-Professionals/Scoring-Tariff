using System.Threading;
using System.Threading.Tasks;
using Scoring.Dto;
using Volo.Abp.Account;

namespace Scoring.Services
{
    public interface IResetPasswordService
    {
        Task SendToken(SendPasswordResetCodeInput input, CancellationToken ct);

        Task Confirm(ResetPasswordDto input, CancellationToken ct);
    }
}