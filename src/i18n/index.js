import moment from 'moment/min/moment-with-locales';

import {getLanguageLocale, getLanguage} from './utilities';

import en from './en';

const Vocabularies = {
  en,
};

export class I18N {
  static getLanguageLocale() {
    return getLanguageLocale();
  }

  static getLanguage() {
    return getLanguage();
  }

  constructor(local = getLanguage()) {
    this.language = Vocabularies[local] ? local : 'en';
    moment.locale(this.language);
    this.vocabularies = Vocabularies;
  }

  get() {
    return this.vocabularies[this.language];
  }
}

const Vocabulary = new I18N();

export default Vocabulary;
