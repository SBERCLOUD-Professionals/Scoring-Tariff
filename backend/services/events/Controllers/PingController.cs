using System.Threading.Tasks;
using DotNetCore.CAP;
using Kafka.Contracts;
using Kafka.Contracts.Messages;
using Microsoft.AspNetCore.Mvc;

namespace Events.Controllers
{
    [Route("ping")]
    [Controller]
    public class PingController : ControllerBase
    {
        public PingController(ICapPublisher capPublisher)
        {
            CapPublisher = capPublisher;
        }

        private ICapPublisher CapPublisher { get; }

        [Route("cap")]
        [HttpGet]
        public async Task<IActionResult> Ping()
        {
            await CapPublisher.PublishAsync(KafkaTopics.Ping, new PingMessage());
            return Ok("success");
        }
    }
}