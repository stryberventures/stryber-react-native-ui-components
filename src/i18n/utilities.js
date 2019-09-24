import {NativeModules, Platform} from 'react-native';

export const getLanguageLocale = () =>
  Platform.OS === 'android' ? 'en' : 'en';

export const getLanguage = () => getLanguageLocale().substring(0, 2);
