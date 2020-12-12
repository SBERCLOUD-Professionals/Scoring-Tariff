using System.Diagnostics.CodeAnalysis;
using Volo.Abp.Settings;

namespace Scoring.Settings
{
    [SuppressMessage("ReSharper", "UnusedMember.Global")]
    [SuppressMessage("ReSharper", "UnusedType.Global")]
    public class ScoringSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(ScoringSettings.MySetting1));
        }
    }
}