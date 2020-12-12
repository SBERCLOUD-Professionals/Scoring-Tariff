using Scoring.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Scoring.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class ScoringController : AbpController
    {
        protected ScoringController()
        {
            LocalizationResource = typeof(ScoringResource);
        }
    }
}