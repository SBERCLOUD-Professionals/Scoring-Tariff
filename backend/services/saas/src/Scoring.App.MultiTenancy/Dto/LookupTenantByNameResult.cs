using System;

namespace Scoring.Dto
{
    public class LookupTenantByNameResult
    {
        public LookupTenantByNameResult(bool success, Guid? tenantId = null)
        {
            Success = success;
            TenantId = tenantId;
        }

        public bool Success { get; }
        public Guid? TenantId { get; }
    }
}