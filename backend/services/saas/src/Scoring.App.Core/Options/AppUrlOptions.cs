namespace Scoring.Options
{
    public class AppUrlOptions
    {
        public ApplicationUrlDictionary Applications { get; }

        public AppUrlOptions()
        {
            Applications = new ApplicationUrlDictionary();
        }
    }
}