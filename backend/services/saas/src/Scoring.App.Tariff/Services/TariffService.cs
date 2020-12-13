using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Scoring.Dto;
using Scoring.Permissions;
using Scoring.Tariffs;
using Volo.Abp.Domain.Repositories;

namespace Scoring.Services
{
    public class TariffService : ScoringAppService
    {
        public TariffService(IRepository<Tariff, Guid> tariffRepository)
        {
            TariffRepository = tariffRepository;
        }

        private IRepository<Tariff, Guid> TariffRepository { get; }


        [Authorize(ScoringPermissions.Tariff.Self)]
        public async Task<IList<TariffDto>> AllTariff()
        {
            var query = TariffRepository.WithDetails();
            var entities = await AsyncExecuter.ToListAsync(query);

            return ObjectMapper.Map<IList<Tariff>, IList<TariffDto>>(entities);
        }
    }
}