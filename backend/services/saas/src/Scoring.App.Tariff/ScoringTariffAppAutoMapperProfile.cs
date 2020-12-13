using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using Scoring.Dto;
using Scoring.Tariffs;
using Volo.Abp.TenantManagement;
using TariffFeature = Scoring.Tariffs.TariffFeature;

namespace Scoring
{
    [SuppressMessage("ReSharper", "UnusedMember.Global")]
    [SuppressMessage("ReSharper", "UnusedType.Global")]
    internal class ScoringTariffAppAutoMapperProfile : Profile
    {
        public ScoringTariffAppAutoMapperProfile()
        {
            CreateMap<Feature, FeatureDto>();
            CreateMap<Tariff, TariffDto>();
            CreateMap<TariffFeature, TariffFeatureDto>();
        }
    }
}