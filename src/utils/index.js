import {useState} from 'react';
import {Platform, Dimensions} from 'react-native';
import Vocabulary from '../i18n';

export const isIphoneX = () =>
  Platform.OS === 'ios' &&
  !isTablet() &&
  !Platform.isTVOS &&
  (Dimensions.get('window').height === 812 ||
    Dimensions.get('window').width === 812 ||
    Dimensions.get('window').height === 896 ||
    Dimensions.get('window').width === 896);

export const isTablet = () => Platform.isPad;

export const Validator = {
  text: value => {
    const result = {
      type: 'text',
      error: false,
    };
    if (!value || value.trim().length <= 0) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidText;
    }
    return result;
  },
  email: value => {
    const result = {
      type: 'email',
      error: false,
    };
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value || !re.test(String(value).toLowerCase())) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidEmail;
    }

    return result;
  },
  password: value => {
    const result = {
      type: 'password',
      error: false,
    };
    if (!value || value.length < 3) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidPassword;
    }
    return result;
  },
  zipCode: value => {
    const result = {
      type: 'zipCode',
      error: false,
    };
    const re = /^[0-9]{4}/;
    if (!value || !re.test(String(value).toLowerCase())) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidZipCode;
    }

    return result;
  },
  firstName: value => {
    const result = {
      type: 'firstName',
      error: false,
    };
    if (!value || value.trim().length <= 0) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidFirstName;
    }
    return result;
  },
  lastName: value => {
    const result = {
      type: 'lastName',
      error: false,
    };
    if (!value || value.trim().length <= 0) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidLastName;
    }
    return result;
  },
  address: value => {
    const result = {
      type: 'address',
      error: false,
    };
    if (!value || value.length <= 0) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidAddress;
    }
    return result;
  },
  phone: value => {
    const result = {
      type: 'phone',
      error: false,
    };
    const re = /^(\+41)\d{8,}/;

    let pureValue = value.replace(/\D/g, '');
    if (pureValue.slice(0, 2) === '41') pureValue = `+${pureValue}`;
    if (pureValue.slice(0, 1) === '0')
      pureValue = `+41${pureValue.slice(1, pureValue.length)}`;

    if (!pureValue || !re.test(String(pureValue).toLowerCase())) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidPhone;
    }
    return result;
  },
  city: value => {
    const result = {
      type: 'city',
      error: false,
    };
    if (!value || value.length <= 0) {
      result.error = true;
      result.message = Vocabulary.get().errors.invalidCity;
    }
    return result;
  },

  paymentCardNumber: value => {
    const result = {
      type: 'paymentCardNumber',
      error: false,
    };
    if (!value || value.length !== 19) {
      result.error = true;
      result.message = Vocabulary.get().errors.paymentCardNumberLength;
    }
    return result;
  },
  paymentCardExpiryDate: value => {
    const result = {
      type: 'paymentCardExpiryDate',
      error: false,
    };
    const regExp = /^\d{2}\/(\d{2}|\d{4})$/g;

    if (!value || !value.match(regExp)) {
      result.error = true;
      result.message = Vocabulary.get().errors.paymentCardExpiryDate;
    }
    return result;
  },
  paymentCardHolder: value => {
    const result = {
      type: 'paymentCardHolder',
      error: false,
    };
    if (!value || value.length <= 0) {
      result.error = true;
      result.message = Vocabulary.get().errors.paymentCardHolder;
    }
    return result;
  },
  paymentCardCVV: value => {
    const result = {
      type: 'paymentCardCVV',
      error: false,
    };
    if (!value || value.length !== 3) {
      result.error = true;
      result.message = Vocabulary.get().errors.paymentCardCVV;
    }
    return result;
  },
  birthday: value => {
    const result = {
      type: 'birthday',
      error: false,
    };
    const regExp = /^\d{2}\/\d{2}\/(\d{4})$/g;

    if (
      !value ||
      !value.match(regExp) ||
      value.split('/')[0] > 31 ||
      value.split('/')[1] > 12
    ) {
      result.error = true;
      result.message = Vocabulary.get().errors.birthday;
    }

    return result;
  },
};

export const pixelToDp = pixel => pixel;

export const customHooks = {
  useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    return [
      values,
      e => {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });
      },
    ];
  },
};

export const pixelFontToDp = pixel => pixel;
