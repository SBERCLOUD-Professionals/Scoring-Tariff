namespace Scoring.Permissions
{
    public static class ScoringPermissions
    {

        public static class Exercises
        {
            public const string Group = "Exercises";
            public const string Self = "Exercises.Self";
            public const string Create = "Exercises.Create";
            public const string Read = "Exercises.Read";
            public const string Update = "Exercises.Update";
            public const string Delete = "Exercises.Delete";

            public static string[] Crud()
            {
                return new[] {Create, Update, Read, Delete};
            }
        }
        
        public static class ExerciseCategories
        {
            public const string Group = "ExerciseCategories";
            public const string Self = "ExerciseCategories.Self";
            public const string Create = "ExerciseCategories.Create";
            public const string Read = "ExerciseCategories.Read";
            public const string Update = "ExerciseCategories.Update";
            public const string Delete = "ExerciseCategories.Delete";

            public static string[] Crud()
            {
                return new[] {Create, Update, Read, Delete};
            }
        }
        
        public static class ExerciseForms
        {
            public const string Group = "ExerciseForms";
            public const string Self = "ExerciseForms.Self";
            public const string Create = "ExerciseForms.Create";
            public const string Read = "ExerciseForms.Read";
            public const string Update = "ExerciseForms.Update";
            public const string Delete = "ExerciseForms.Delete";

            public static string[] Crud()
            {
                return new[] {Create, Update, Read, Delete};
            }
        }
    }
}