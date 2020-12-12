using System;
using Microsoft.IdentityModel.Tokens;

namespace Scoring.Settings
{
    public class AuthJwtSettings
    {
        internal AuthJwtSettings(string issuer, string audience, SymmetricSecurityKey securityKey, 
            TimeSpan expirationDays, bool requireHttpsMetadata)
        {
            Issuer = issuer;
            Audience = audience;
            SecurityKey = securityKey;
            SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            ExpirationDays = expirationDays;
            RequireHttpsMetadata = requireHttpsMetadata;
        }

        public string Issuer { get; }

        public string Audience { get; }

        public SymmetricSecurityKey SecurityKey { get; }

        public SigningCredentials SigningCredentials { get; }

        public TimeSpan ExpirationDays { get; }
        
        public bool RequireHttpsMetadata { get; }
    }
}