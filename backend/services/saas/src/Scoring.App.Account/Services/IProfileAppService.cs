using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace Scoring.Services
{
    public interface IProfileAppService : IApplicationService
    {
        Task<ProfileDto> Get(CancellationToken ct);

        Task<ProfileDto> Update(UpdateProfileDto input, CancellationToken ct);

        Task ChangePassword(ChangePasswordInput input, CancellationToken ct);
    }
}