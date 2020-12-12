using System.Threading;
using System.Threading.Tasks;
using Scoring.Dto;
using Volo.Abp.Application.Services;

namespace Scoring.Services
{
    public interface IRegistrationAppService : IApplicationService
    {
        Task<LookupTenantByNameResult> LookupByName(LookupTenantByNameInput input, CancellationToken ct);

        Task<RegisterTenantResult> Create(RegisterTenantInput input, CancellationToken ct);
    }
}