using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Scoring.Dto
{
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
    public class LookupTenantByNameInput
    {
        [Required] [StringLength(64)] public string TenancyName { get; set; } = null!;
    }
}