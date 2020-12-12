using System.Threading;
using System.Threading.Tasks;

namespace Scoring.Providers
{
    public interface IAppUrlProvider
    {
        Task<string> GetUrlAsync(string appName, string? urlName = null, CancellationToken ct =default);
    }
}