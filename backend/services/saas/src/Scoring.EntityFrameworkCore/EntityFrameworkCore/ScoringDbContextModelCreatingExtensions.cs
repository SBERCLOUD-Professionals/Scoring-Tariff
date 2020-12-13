using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Scoring.Tariffs;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Scoring.EntityFrameworkCore
{
    public static class ScoringDbContextModelCreatingExtensions
    {
        public static void ConfigureScoring(this ModelBuilder builder, DatabaseFacade database)
        {
            Check.NotNull(builder, nameof(builder));
            Check.NotNull(database, nameof(database));

            builder.Entity<Tariff>(model =>
            {
                model.ConfigureByConvention();
                model.Property(x => x.Name).IsRequired();
                model.HasMany(x => x.TariffFeatures)
                    .WithOne().HasForeignKey(x => x.TariffId);
            });

            builder.Entity<Feature>(model =>
            {
                model.ConfigureByConvention();
                model.Property(x => x.Name).IsRequired();
                model.Property(x => x.SKU).IsRequired();
                model.HasMany(x => x.TariffFeatures)
                    .WithOne().HasForeignKey(x => x.FeatureId);
            });

            builder.Entity<TariffFeature>(model =>
            {
                model.ConfigureByConvention();
                model.Property(x => x.Count).IsRequired();
            });
        }
    }
}