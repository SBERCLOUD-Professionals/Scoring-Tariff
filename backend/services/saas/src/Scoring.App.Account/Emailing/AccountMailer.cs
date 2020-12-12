using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Extensions.Localization;
using Scoring.Localization;
using Scoring.Providers;
using Scoring.ViewModels;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Emailing;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.TextTemplating;

namespace Scoring.Emailing
{
    [SuppressMessage("ReSharper", "ArgumentsStyleOther")]
    internal class AccountMailer : IAccountMailer, ITransientDependency
    {
        public AccountMailer(
            IEmailSender emailSender,
            ITemplateRenderer templateRenderer,
            IStringLocalizer<EmailingResource> stringLocalizer,
            IAppUrlProvider appUrlProvider,
            ICurrentTenant currentTenant)
        {
            EmailSender = emailSender;
            StringLocalizer = stringLocalizer;
            AppUrlProvider = appUrlProvider;
            CurrentTenant = currentTenant;
            TemplateRenderer = templateRenderer;
        }

        private ITemplateRenderer TemplateRenderer { get; }
        private IEmailSender EmailSender { get; }
        private IStringLocalizer<EmailingResource> StringLocalizer { get; }
        private IAppUrlProvider AppUrlProvider { get; }
        private ICurrentTenant CurrentTenant { get; }

        public virtual async Task SendResetPasswordLink(IdentityUser user, string resetToken, string appName,
            string? returnUrl, string? returnUrlHash, CancellationToken ct)
        {
            Debug.Assert(CurrentTenant.Id == user.TenantId, "This method can only work for current tenant!");

            var url = await GetResetPasswordUrlAsync(AppUrlProvider, appName);

            var link = $"{url}?userId={user.Id}&tenantId={user.TenantId}&resetToken={UrlEncoder.Default.Encode(resetToken)}";

            if (!returnUrl.IsNullOrEmpty()) link += "&returnUrl=" + NormalizeReturnUrl(returnUrl);

            if (!returnUrlHash.IsNullOrEmpty()) link += "&returnUrlHash=" + returnUrlHash;

            var emailContent = await TemplateRenderer.RenderAsync(EmailingTemplates.ResetPasswordLink,
                model: new ResetPasswordEmailVm
                {
                    Username = user.Name,
                    ConfirmActionTitle = StringLocalizer["ResetPassword:ConfirmAction"],
                    ConfirmActionUrl = link
                },
                globalContext: new EmailLayoutVm(StringLocalizer["ResetPassword:Title"]));

            await EmailSender.SendAsync(user.Email, StringLocalizer["ResetPassword:Title"], emailContent);
        }

        private static string? NormalizeReturnUrl(string? returnUrl)
        {
            if (returnUrl.IsNullOrEmpty()) return returnUrl;

            //Handling openid connect login
            if (returnUrl!.StartsWith("/connect/authorize/callback", StringComparison.OrdinalIgnoreCase))
                if (returnUrl.Contains("?"))
                {
                    var queryPart = returnUrl.Split('?')[1];
                    var queryParameters = queryPart.Split('&');
                    foreach (var queryParameter in queryParameters)
                        if (queryParameter.Contains("="))
                        {
                            var queryParam = queryParameter.Split('=');
                            if (queryParam[0] == "redirect_uri") return HttpUtility.UrlDecode(queryParam[1]);
                        }
                }

            return returnUrl;
        }

        private static Task<string> GetResetPasswordUrlAsync(IAppUrlProvider appUrlProvider, string appName)
        {
            return appUrlProvider.GetUrlAsync(appName, AccountUrlNames.ResetPassword);
        }
    }
}