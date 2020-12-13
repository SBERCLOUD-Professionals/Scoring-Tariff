using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Scoring.Tariffs;
using Scoring.Users;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.Identity;
using Volo.Abp.Users.EntityFrameworkCore;

namespace Scoring.EntityFrameworkCore
{
    /* This is your actual DbContext used on runtime.
     * It includes only your entities.
     * It does not include entities of the used modules, because each module has already
     * its own DbContext class. If you want to share some database tables with the used modules,
     * just create a structure like done for AppUser.
     *
     * Don't use this DbContext for database migrations since it does not contain tables of the
     * used modules (as explained above). See ScoringMigrationsDbContext for migrations.
     */
    [ConnectionStringName("Default")]
    [SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Local")]
    public class ScoringDbContext : AbpDbContext<ScoringDbContext>
    {
        /* Add DbSet properties for your Aggregate Roots / Entities here.
         * Also map them inside ScoringDbContextModelCreatingExtensions.ConfigureScoring
         */

        public ScoringDbContext(DbContextOptions<ScoringDbContext> options)
            : base(options)
        {
        }

        public DbSet<AppUser> Users { get; private set; } = null!;
        public DbSet<Tariff> Tariffs { get; private set; } = null!;
        public DbSet<Feature> Features { get; private set; } = null!;
        public DbSet<TariffFeature> TariffFeatures { get; private set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /* Configure the shared tables (with included modules) here */

            builder.Entity<AppUser>(b =>
            {
                b.ToTable(AbpIdentityDbProperties.DbTablePrefix + "Users"); //Sharing the same table "AbpUsers" with the IdentityUser

                b.ConfigureByConvention();
                b.ConfigureAbpUser();

                /* Configure mappings for your additional properties
                 * Also see the ScoringEfCoreEntityExtensionMappings class
                 */
            });

            /* Configure your own tables/entities inside the ConfigureScoring method */
            builder.ConfigureScoring(Database);
        }
    }
}