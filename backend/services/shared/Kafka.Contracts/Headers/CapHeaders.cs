using System.Collections.Generic;

namespace Kafka.Contracts.Headers
{
    /// <summary>
    ///     Заголовки для Cap
    /// </summary>
    public class CapHeaders : Dictionary<string, string>
    {
        /// <summary>
        ///     Ключ для сообщения. Отличается от MessageId. Необъодим, если нужно отправлять сообщения в один раздел.
        ///     Equals -> DotNetCore.CAP.Kafka.KafkaHeaders.KafkaKey
        /// </summary>
        public string MessageKey
        {
            get => Get("cap-kafka-key");
            set => SetObject("cap-kafka-key", value);
        }

        /// <summary>
        ///     When set to `true`, the producer will ensure that messages are successfully produced exactly once and in the
        ///     original produce order. The following configuration properties are adjusted automatically (if not modified by the
        ///     user) when idempotence is enabled: `max.in.flight.requests.per.connection=5` (must be less than or equal to 5),
        ///     `retries=INT32_MAX` (must be greater than 0), `acks=all`, `queuing.strategy=fifo`. Producer instantation will fail
        ///     if user-supplied configuration is incompatible.
        ///     default: false
        ///     importance: high
        /// </summary>
        public bool? EnableIdempotence
        {
            get => GetBool("enable.idempotence");
            set => SetObject("enable.idempotence", value);
        }

        private void SetObject(string name, object val)
        {
            switch (val)
            {
                case null:
                    Remove(name);
                    break;
                default:
                    this[name] = val.ToString();
                    break;
            }
        }

        private bool? GetBool(string key)
        {
            return bool.Parse(Get(key));
        }

        private string Get(string key)
        {
            return TryGetValue(key, out var str) ? str : null;
        }
    }
}