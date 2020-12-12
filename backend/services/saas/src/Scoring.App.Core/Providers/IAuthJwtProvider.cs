using System.Threading;
using System.Threading.Tasks;
using Scoring.Settings;
using Volo.Abp.Identity;

namespace Scoring.Providers
{
    public interface IAuthJwtProvider
    {
        Task<string> GenerateJwt(IdentityUser user, CancellationToken ct);
        
        AuthJwtSettings JwtSettings { get; }
    }
}