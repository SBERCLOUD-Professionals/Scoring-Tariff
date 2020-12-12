namespace Scoring.Dto
{
    public class AuthenticateResult
    {
        public AuthenticateResult(string accessToken, double expireInSeconds)
        {
            AccessToken = accessToken;
            ExpireInSeconds = expireInSeconds;
        }

        public string AccessToken { get; }

        public double ExpireInSeconds { get; }
    }
}