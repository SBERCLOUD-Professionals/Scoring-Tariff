using System;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace Scoring.Tariffs
{
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
    public class TariffFeature : AuditedEntity<Guid>
    {
        public TariffFeature()
        {
        }

        public TariffFeature(Guid id, Tariff tariff, Feature feature, int count): base(id)
        {
            Feature = feature;
            Count = count;
            FeatureId = feature.Id;
            TariffId = tariff.Id;
        }

        public Guid FeatureId { get; set; }

        public Guid TariffId { get; set; }

        public Feature Feature { get; }
        
        public int Count { get; set; }
    }
}