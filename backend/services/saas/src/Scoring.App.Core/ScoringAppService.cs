using Scoring.Localization;
using Volo.Abp.Application.Services;

namespace Scoring
{
    /* Inherit your application services from this class.
     */
    public abstract class ScoringAppService : ApplicationService
    {
        protected ScoringAppService()
        {
            LocalizationResource = typeof(ScoringResource);
        }
    }
}