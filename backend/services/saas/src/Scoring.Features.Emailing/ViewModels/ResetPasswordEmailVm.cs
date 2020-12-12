using System.Diagnostics.CodeAnalysis;

namespace Scoring.ViewModels
{
    [SuppressMessage("ReSharper", "UnusedAutoPropertyAccessor.Global")]
    public class ResetPasswordEmailVm
    {
        public string Username { get; set; } = null!;
        
        public string ConfirmActionUrl { get; set; } = null!;
        
        public string ConfirmActionTitle { get; set; } = null!;
    }
}