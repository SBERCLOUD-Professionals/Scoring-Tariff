using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Volo.Abp.Domain.Entities.Auditing;

namespace Scoring.Tariffs
{
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Local")]
    public class Tariff : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }

        public IList<TariffFeature> TariffFeatures { get; set; }
        
        private IList<Feature>? Features => TariffFeatures.Select(x => x.Feature)?.ToList();


        public Tariff()
        {

        }

        public Tariff(Guid id, string name) : base(id)
        {
            Name = name;
            TariffFeatures = new List<TariffFeature>();
        }
    }
}