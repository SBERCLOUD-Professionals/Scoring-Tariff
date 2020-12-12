using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Scoring.Swagger
{
    /// <inheritdoc />
    [SuppressMessage("ReSharper", "ClassWithVirtualMembersNeverInherited.Global")]
    internal class AppSwaggerUIOptions : IConfigureOptions<SwaggerUIOptions>
    {
        /// <inheritdoc />
        public void Configure(SwaggerUIOptions options)
        {
            ConfigureSwaggerEndpoint(options);
            ConfigureCustomIndex(options);
        }

        /// <summary>
        ///     Настройка
        /// </summary>
        protected virtual void ConfigureSwaggerEndpoint(SwaggerUIOptions options)
        {
            var assembly = Assembly.GetExecutingAssembly();
            options.SwaggerEndpoint("/swagger/v1/swagger.json", $"{assembly.GetName().Name} v1");
        }

        /// <summary>
        ///     Настройка кастомного index.html
        /// </summary>
        protected virtual void ConfigureCustomIndex(SwaggerUIOptions options)
        {
            var indexHtml = typeof(AppSwaggerUIOptions).Assembly.GetManifestResourceNames()
                .FirstOrDefault(x => x.Contains("index.html"));
            if (!string.IsNullOrEmpty(indexHtml))
            {
                options.IndexStream = () => GetType().Assembly.GetManifestResourceStream(indexHtml);
            }
        }
    }
}