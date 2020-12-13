using System;
using Volo.Abp.Application.Dtos;

namespace Scoring.Dto
{
    public class TariffFeatureDto :  EntityDto<Guid>
    {
        public int Count { get; set; }
        
        public FeatureDto Feature { get; set; }
    }
}