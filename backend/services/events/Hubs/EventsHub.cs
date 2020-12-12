using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using DotNetCore.CAP;
using Kafka.Contracts;
using Kafka.Contracts.Headers;
using Kafka.Contracts.Messages;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Service.Contracts;

namespace Events.Hubs
{
    public class EventsHub : Hub
    {
        public EventsHub(ILogger<EventsHub> logger, ICapPublisher capPublisher,
            IDataProtectionProvider dataProtectionProvider)
        {
            Logger = logger;
            CapPublisher = capPublisher;
            DataProtector = dataProtectionProvider.CreateProtector(DataProtection.ApiKey);
        }

        private IDataProtector DataProtector { get; }
        private ICapPublisher CapPublisher { get; }

        private ILogger<EventsHub> Logger { get; }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine(Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        [SuppressMessage("ReSharper", "UnusedMember.Global")]
        public async Task Register(string @event)
        {
            Logger.LogInformation(@event);
            try
            {
                var httpContext = Context.GetHttpContext();
                var query = httpContext.Request.Query;

                if (!query.TryGetValue("api_key", out var values)) throw new ArgumentException("Не найден api_key");

                var apiKey = values.First();
                var tenantId = DataProtector.Unprotect(apiKey);

                var message = new EventMessage
                {
                    TenantId = Guid.Parse(tenantId),
                    Event = @event
                };

                var headers = new CapHeaders
                {
                    MessageKey = tenantId,
                    EnableIdempotence = true
                };

                await CapPublisher.PublishAsync(KafkaTopics.Events, message, headers);
            }
            catch (Exception e)
            {
                Logger.LogError(e.Message);
                throw new Exception("Не удалось обработать эвент", e);
            }
        }
    }
}