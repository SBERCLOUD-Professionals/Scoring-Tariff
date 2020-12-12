using System.Collections.Generic;

namespace Scoring.Options
{
    public class ApplicationUrlDictionary
    {
        private readonly IDictionary<string, ApplicationUrlInfo> _applications;

        public ApplicationUrlDictionary()
        {
            _applications = new Dictionary<string, ApplicationUrlInfo>();
        }

        public ApplicationUrlInfo this[string appName]
        {
            get
            {
                if (!_applications.ContainsKey(appName)) _applications[appName] = new ApplicationUrlInfo();
                return _applications[appName];
            }
        }
    }
}