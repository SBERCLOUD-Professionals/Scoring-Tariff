using System;
using System.Threading.Tasks;
using Scoring.Tariffs;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.Uow;

namespace Scoring.Seeders
{
    public class DefaultTariffsDataSeeder : IDataSeedContributor, ITransientDependency
    {
        public DefaultTariffsDataSeeder(IRepository<Tariff, Guid> tariffRepository, IGuidGenerator guidGenerator,
            IRepository<Feature, Guid> featureRepository)
        {
            TariffRepository = tariffRepository;
            GuidGenerator = guidGenerator;
            FeatureRepository = featureRepository;
        }

        private IGuidGenerator GuidGenerator { get; }

        private IRepository<Tariff, Guid> TariffRepository { get; }
        private IRepository<Feature, Guid> FeatureRepository { get; }
        private IRepository<TariffFeature, Guid> TariffFeatureRepository { get; }

        [UnitOfWork]
        public async Task SeedAsync(DataSeedContext context)
        {
            if (context.TenantId == null) return;

            var videoFeature = new Feature(GuidGenerator.Create(), "Видеозвонки", "video")
            {
                TenantId = context.TenantId
            };
            var audioFeature = new Feature(GuidGenerator.Create(), "Аудиозвонки", "audio")
            {
                TenantId = context.TenantId
            };
            var messagesFeature = new Feature(GuidGenerator.Create(), "Сообщения", "messages")
            {
                TenantId = context.TenantId
            };
            var historyFeature = new Feature(GuidGenerator.Create(), "История", "history")
            {
                TenantId = context.TenantId
            };
            var usersFeature = new Feature(GuidGenerator.Create(), "Пользователи", "users")
            {
                TenantId = context.TenantId
            };
            var projectsFeature = new Feature(GuidGenerator.Create(), "Проекты", "projects")
            {
                TenantId = context.TenantId
            };
            var ssoFeature = new Feature(GuidGenerator.Create(), "SSO", "sso")
            {
                TenantId = context.TenantId
            };

            await FeatureRepository.InsertAsync(videoFeature, true);
            await FeatureRepository.InsertAsync(audioFeature, true);
            await FeatureRepository.InsertAsync(messagesFeature, true);
            await FeatureRepository.InsertAsync(historyFeature, true);
            await FeatureRepository.InsertAsync(usersFeature, true);
            await FeatureRepository.InsertAsync(projectsFeature, true);
            await FeatureRepository.InsertAsync(ssoFeature, true);

            var basicTariff = new Tariff(GuidGenerator.Create(), "Базовый")
            {
                TenantId = context.TenantId
            };

            var mediumTariff = new Tariff(GuidGenerator.Create(), "Обычный")
            {
                TenantId = context.TenantId
            };


            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, videoFeature, 2)
            {
                TenantId = context.TenantId
            });
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, audioFeature, 2)
            {
                TenantId = context.TenantId
            });
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, messagesFeature, 2)
            {
                TenantId = context.TenantId
            });
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, historyFeature, 2)
            {
                TenantId = context.TenantId
            });
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, usersFeature, 2)
            {
                TenantId = context.TenantId
            });
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, projectsFeature, 2)
            {
                TenantId = context.TenantId
            });
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, ssoFeature, 2)
            {
                TenantId = context.TenantId
            });
            
            
            // --

            mediumTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, videoFeature, 10)
            {
                TenantId = context.TenantId
            });
            mediumTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, audioFeature, 10)
            {
                TenantId = context.TenantId
            });
            mediumTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, messagesFeature, 10)
            {
                TenantId = context.TenantId
            });
            mediumTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, historyFeature, 10)
            {
                TenantId = context.TenantId
            });
            mediumTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, usersFeature, 10)
            {
                TenantId = context.TenantId
            });
            mediumTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, projectsFeature, 10)
            {
                TenantId = context.TenantId
            });
            mediumTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, ssoFeature, 10)
            {
                TenantId = context.TenantId
            });

            await TariffRepository.InsertAsync(basicTariff, true);
            await TariffRepository.InsertAsync(mediumTariff, true);
        }
    }
}