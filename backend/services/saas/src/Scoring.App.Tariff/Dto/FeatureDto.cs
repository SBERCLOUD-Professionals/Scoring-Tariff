using System;
using Volo.Abp.Application.Dtos;

namespace Scoring.Dto
{
    public class FeatureDto :  EntityDto<Guid>
    {
        public string Name { get; set; }
        public string SKU { get; set; }
    }
}