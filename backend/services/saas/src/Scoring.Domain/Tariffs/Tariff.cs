using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Scoring.Tariffs
{
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Local")]
    public class Tariff : FullAuditedAggregateRoot<Guid>, IMultiTenant
    {
        public string Name { get; set; }

        public IList<TariffFeature> TariffFeatures { get; set; }


        public Tariff()
        {

        }

        public Tariff(Guid id, string name) : base(id)
        {
            Name = name;
            TariffFeatures = new List<TariffFeature>();
        }

        public Guid? TenantId { get;  set; }
    }
}