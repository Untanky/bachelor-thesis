import ServiceConf from '../service.conf.json';

export const selectLanguage = language => ({
  type: 'SELECT_LANGUAGE',
  language: LanguageSelection.find((item) => item.value === language),
});


export const LanguageSelection = ServiceConf;
