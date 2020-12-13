using System;

namespace Kafka.Contracts.Messages
{
    public class PingMessage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}