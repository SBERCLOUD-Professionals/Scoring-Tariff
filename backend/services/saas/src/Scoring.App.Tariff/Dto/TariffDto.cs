using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Scoring.Dto
{
    public class TariffDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        
        public IList<TariffFeatureDto> TariffFeatures { get; set; }
    }
}