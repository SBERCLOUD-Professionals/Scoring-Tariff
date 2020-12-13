using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Scoring.Tariffs
{
    public class Feature : AuditedEntity<Guid>
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
    }
}