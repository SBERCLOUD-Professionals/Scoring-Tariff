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

        [UnitOfWork]
        public async Task SeedAsync(DataSeedContext context)
        {
            if (context.TenantId == null) return;
            
            var videoFeature = new Feature(GuidGenerator.Create(), "Видеозвонки", "video");
            var audioFeature = new Feature(GuidGenerator.Create(), "Аудиозвонки", "audio");
            var messagesFeature = new Feature(GuidGenerator.Create(), "Сообщения", "messages");
            var historyFeature = new Feature(GuidGenerator.Create(), "История", "history");
            var usersFeature = new Feature(GuidGenerator.Create(), "Пользователи", "users");
            var projectsFeature = new Feature(GuidGenerator.Create(), "Проекты", "projects");
            var ssoFeature = new Feature(GuidGenerator.Create(), "SSO", "sso");

            await FeatureRepository.InsertAsync(videoFeature, true);
            await FeatureRepository.InsertAsync(audioFeature, true);
            await FeatureRepository.InsertAsync(messagesFeature, true);
            await FeatureRepository.InsertAsync(historyFeature, true);
            await FeatureRepository.InsertAsync(usersFeature, true);
            await FeatureRepository.InsertAsync(projectsFeature, true);
            await FeatureRepository.InsertAsync(ssoFeature, true);

            var basicTariff = new Tariff(GuidGenerator.Create(), "Базовый");
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, videoFeature, 2));
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, audioFeature, 2));
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, messagesFeature, 2));
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, historyFeature, 2));
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, usersFeature, 2));
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, projectsFeature, 2));
            basicTariff.TariffFeatures.Add(new TariffFeature(GuidGenerator.Create(), basicTariff, ssoFeature, 2));


            await TariffRepository.InsertAsync(basicTariff, true);
        }
    }
}