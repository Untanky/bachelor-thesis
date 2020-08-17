export const selectLanguage = language => ({
  type: 'SELECT_LANGUAGE',
  language: LanguageSelection.find((item) => item.value === language),
});


export const LanguageSelection = [
  { value: 'DEFAULT', text: 'Default (:8000)', port: 8000 },
  { value: 'JAVA_SPRING', text: 'Java - Spring (:8080)', port: 8080 },
  { value: 'JAVA_JAXRS', text: 'Java - JAXRS (:8081)', port: 8081 },
  { value: 'CSHARP_ASPNET', text: 'C# - ASP.NET (:8082)', port: 8082 },
]
