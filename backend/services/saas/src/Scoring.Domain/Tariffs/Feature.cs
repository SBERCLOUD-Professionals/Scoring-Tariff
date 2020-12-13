using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Scoring.Tariffs
{
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
    public class Feature : AuditedEntity<Guid>, IMultiTenant
    {
        public Feature()
        {
            
        }
        
        public IList<TariffFeature> TariffFeatures { get; set; }
        
        public Feature(Guid id, string name, string sku) : base(id)
        {
            Name = name;
            SKU = sku;
        }

        public string Name { get; set; }
        public string SKU { get; set; }
        public Guid? TenantId { get; set; }
    }
}