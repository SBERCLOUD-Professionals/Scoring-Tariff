using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Scoring.Dto
{
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
    public class AuthenticateInput
    {
        [Required] [StringLength(128)] public string UsernameOrEmail { get; set; } = null!;

        [Required] [StringLength(256)] public string Password { get; set; } = null!;
    }
}