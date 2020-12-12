namespace Scoring.Dto
{
    public class RegisterAdminTokenDto
    {
        public RegisterAdminTokenDto(string accessToken)
        {
            AccessToken = accessToken;
        }

        public string AccessToken { get; }
    }
}