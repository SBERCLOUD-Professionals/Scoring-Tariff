using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace Scoring.Options
{
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
    public class ApplicationUrlInfo
    {
        public ApplicationUrlInfo()
        {
            Urls = new Dictionary<string, string>();
        }

        public string RootUrl { get; set; } = string.Empty;

        public IDictionary<string, string> Urls { get; }
    }
}