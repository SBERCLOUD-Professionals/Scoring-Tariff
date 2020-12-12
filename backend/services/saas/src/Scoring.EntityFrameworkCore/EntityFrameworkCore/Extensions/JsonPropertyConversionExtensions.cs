using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace Scoring.EntityFrameworkCore.Extensions
{
    /// <summary>
    ///     https://stackoverflow.com/a/59185869
    /// </summary>
    internal static class JsonPropertyConversionExtensions
    {
        /// <summary>
        ///     Сделать столбец в формате sonb
        /// </summary>
        /// <param name="propertyBuilder"></param>
        /// <param name="databaseFacade">Фасад БД</param>
        public static PropertyBuilder<T> HasJsonConversion<T>(this PropertyBuilder<T> propertyBuilder,
            DatabaseFacade databaseFacade) where T : class
        {
            if (!databaseFacade.IsNpgsql()) return InMemoryJson(propertyBuilder);
            
            propertyBuilder.HasColumnType("jsonb");
            return propertyBuilder;
        }

        private static PropertyBuilder<T> InMemoryJson<T>(PropertyBuilder<T> propertyBuilder)
        {
            var converter = new ValueConverter<T, string>
            (
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<T>(v)
            );
            var comparer = new ValueComparer<T>
            (
                (l, r) => JsonConvert.SerializeObject(l) == JsonConvert.SerializeObject(r),
                v => v == null ? 0 : JsonConvert.SerializeObject(v).GetHashCode(),
                v => JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(v))
            );
            propertyBuilder.HasConversion(converter);
            propertyBuilder.Metadata.SetValueConverter(converter);
            propertyBuilder.Metadata.SetValueComparer(comparer);
            propertyBuilder.HasColumnType("jsonb");

            return propertyBuilder;
        }
    }

}