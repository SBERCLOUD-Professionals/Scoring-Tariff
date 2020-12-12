using System;

namespace Kafka.Contracts.Messages
{
    public class EventMessage
    {
        public Guid TenantId { get; set; }

        public string Event { get; set; }
    }
}