using Volo.Abp.TenantManagement;

namespace Scoring.Dto
{
    public class RegisterTenantResult
    {
        public RegisterTenantResult(RegisterAdminTokenDto adminToken, TenantDto tenant)
        {
            AdminToken = adminToken;
            Tenant = tenant;
        }

        public RegisterAdminTokenDto AdminToken { get; }

        public TenantDto Tenant { get; }
    }
}