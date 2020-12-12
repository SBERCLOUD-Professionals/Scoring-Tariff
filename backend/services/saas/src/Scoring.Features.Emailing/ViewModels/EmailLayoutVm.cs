using System.Collections.Generic;

namespace Scoring.ViewModels
{
    public class EmailLayoutVm : Dictionary<string, object>
    {
        public EmailLayoutVm(string title, string? description = null)
        {
            this["culture"] = ScoringConsts.Localization.DefaultCulture;
            this["title"] = title;
            if (!string.IsNullOrWhiteSpace(description)) this["description"] = description;
        }
    }
}