using System.Threading;
using System.Threading.Tasks;
using Scoring.Dto;
using Volo.Abp.Application.Services;

namespace Scoring.Services
{
    public interface IAuthAppService : IApplicationService
    {
        Task<AuthenticateResult> Authenticate(AuthenticateInput input, CancellationToken ct);
    }
}