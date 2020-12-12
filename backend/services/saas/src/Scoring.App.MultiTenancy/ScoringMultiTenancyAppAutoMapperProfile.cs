using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using Volo.Abp.TenantManagement;

namespace Scoring
{
    [SuppressMessage("ReSharper", "UnusedMember.Global")]
    [SuppressMessage("ReSharper", "UnusedType.Global")]
    internal class ScoringMultiTenancyAppAutoMapperProfile : Profile
    {
        public ScoringMultiTenancyAppAutoMapperProfile()
        {
            CreateMap<Tenant, TenantDto>();
        }
    }
}