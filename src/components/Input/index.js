import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
  Animated,
  ViewPropTypes,
  Easing,
  Text,
} from 'react-native';
// import Text from '../Text';

import styles from './styles';
import {Validator, pixelToDp, pixelFontToDp} from '../../utils';

class Input extends Component {
  state = {
    movePlaceholder: false,
    animated: {
      focusUnderline: new Animated.Value(0.0001),
      placeholder: {
        fontSize: new Animated.Value(pixelFontToDp(15)),
        fontColor: new Animated.Value(0.0001),
        positionTop: new Animated.Value(pixelToDp(23)),
      },
    },
    value: '',
    error: '' || this.props.error,
    focused: false,
    isBackspace: false,
  };

  inputField = React.createRef();

  getValue() {
    return this.state.value;
  }

  setError(error) {
    return this.setState({error});
  }

  constructor(props) {
    super(props);

    if (this.props.value) {
      this.state.value = this.props.value;
      this.state.movePlaceholder = true;
      this.state.animated.placeholder.fontSize.setValue(pixelFontToDp(12));
      this.state.animated.placeholder.positionTop.setValue(pixelFontToDp(0));
    }
  }

  validate(value) {
    let result;

    switch (this.props.type) {
      case 'firstName':
        result = Validator.firstName(value);
        break;
      case 'lastName':
        result = Validator.lastName(value);
        break;
      case 'address':
        result = Validator.address(value);
        break;
      case 'phone':
        result = Validator.phone(value);
        break;
      case 'city':
        result = Validator.city(value);
        break;
      case 'email':
        result = Validator.email(value);
        break;
      case 'password':
        result = Validator.password(value);
        break;
      case 'zipCode':
        result = Validator.zipCode(value);
        break;
      case 'paymentCardNumber':
        result = Validator.paymentCardNumber(value);
        break;
      case 'paymentCardExpiryDate':
        result = Validator.paymentCardExpiryDate(value);
        break;
      case 'paymentCardHolder':
        result = Validator.paymentCardHolder(value);
        break;
      case 'paymentCardCVV':
        result = Validator.paymentCardCVV(value);
        break;
      case 'birthday':
        result = Validator.birthday(value);
        break;
      case 'requiredText':
        result = Validator.text(value);
        break;
      default:
        result = {};
        break;
    }

    if (result.error) {
      this.setState({error: result.message});
    }

    return result;
  }

  onFocus() {
    this.animate(true);
    this.state.focused = true;
  }

  onBlur() {
    this.animate(false);
    this.state.focused = false;
  }

  animate(selected) {
    const animatedPlaceholder = !this.state.movePlaceholder
      ? [
          Animated.timing(this.state.animated.placeholder.fontSize, {
            toValue: pixelFontToDp(12),
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false,
          }),

          Animated.timing(this.state.animated.placeholder.positionTop, {
            toValue: 0.0001,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]
      : [];

    Animated.parallel([
      Animated.timing(this.state.animated.focusUnderline, {
        toValue: selected ? 1 : 0.0001,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      ...animatedPlaceholder,
    ]).start();

    this.setState({movePlaceholder: true});
  }

  clear() {
    this.setState({value: ''});
  }

  setValue(value) {
    this.setState({value});
  }

  focus() {
    this.inputField.current.focus();
  }

  blur() {
    this.inputField.current.blur();
  }

  applyMask = mask => {
    const {value} = this.state;
    let i = 0;
    const diff = mask.replace(/\D/g, '');
    let unmaskedValue = value.replace(/\D/g, '');
    if (diff.length >= unmaskedValue.length) {
      unmaskedValue = diff;
    }
    const maskedValue = mask.replace(/[X\d]/g, maskChar => {
      const newValue =
        i < unmaskedValue.length ? unmaskedValue.charAt(i) : maskChar;
      i += 1;
      return newValue;
    });
    i = maskedValue.indexOf('X') >= 0 ? maskedValue.indexOf('X') : mask.length;
    return maskedValue.slice(0, i);
  };

  renderAccessory() {
    const {renderAccessory} = this.props;

    if (typeof renderAccessory !== 'function') {
      return null;
    }

    return <View style={styles.accessory}>{renderAccessory()}</View>;
  }

  getValue = () => {
    let value;

    if (this.props.mask.length && !this.state.isBackspace) {
      value = this.applyMask(this.props.mask);
    } else {
      value = this.props.usePropsValue
        ? this.props.value
        : this.state.value || this.props.value;
    }

    return value;
  };

  render() {
    const focusUnderline = {
      scaleX: this.state.animated.focusUnderline,
      transform: [
        {
          scaleX: this.state.animated.focusUnderline.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ],
    };
    const {
      placeholder,
      placeholderLabel,
      onChangeText,
      onChange,
      type,
      style,
      errorStyle,
      textContentType,
      secureTextEntry,
      required,
      keyboardType,
      maxLength,
      autoFocus,
      onFocus,
      onBlur,
      multiline,
      returnKeyType,
      onSubmitEditing,
      blurOnSubmit,
      autoCapitalize,
      editable,
    } = this.props;
    return (
      <View style={[style]}>
        <View style={styles.container}>
          <TextInput
            ref={this.inputField}
            secureTextEntry={secureTextEntry}
            autoCorrect={false}
            autoFocus={autoFocus}
            placeholder={placeholder}
            style={[
              styles.textInput,
              this.state.focused ? styles.textInputFocused : {},
              !editable ? styles.textInputDisabled : {},
            ]}
            onChange={onChange}
            onChangeText={val => {
              this.setState(prevState => ({
                error: '',
                value: val,
                isBackspace: prevState.value.length >= val.length,
              }));
              onChangeText(val, type);
            }}
            underlineColorAndroid="transparent"
            onFocus={() => {
              this.onFocus();
              onFocus(this.state.value);
            }}
            onBlur={() => {
              this.onBlur();
              onBlur(this.state.value);
            }}
            textContentType={textContentType}
            value={this.getValue()}
            keyboardType={keyboardType}
            maxLength={maxLength}
            multiline={multiline}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            autoCapitalize={autoCapitalize}
            editable={editable}
          />
          {this.renderAccessory()}
          {this.state.movePlaceholder ? (
            <Animated.View
              shouldRasterizeIOS
              renderToHardwareTextureAndroid
              style={[
                styles.placeholder,
                {top: this.state.animated.placeholder.positionTop},
              ]}>
              <Animated.Text
                shouldRasterizeIOS
                renderToHardwareTextureAndroid
                style={[
                  styles.placeholderText,
                  styles.placeholderAnimatedText,
                  {fontSize: this.state.animated.placeholder.fontSize},
                ]}>
                {`${placeholderLabel.length ? placeholderLabel : placeholder} ${
                  required ? '*' : ''
                }`}
              </Animated.Text>
            </Animated.View>
          ) : null}
          <Animated.View style={[styles.focusUnderline, focusUnderline]} />
          <Text style={[styles.error, errorStyle]}>{this.state.error}</Text>
        </View>
      </View>
    );
  }
}

export default Input;

Input.defaultProps = {
  placeholder: '',
  type: 'text',
  onChange: () => {},
  onChangeText: () => {},
  style: {},
  errorStyle: {},
  textContentType: 'none',
  secureTextEntry: false,
  value: '',
  required: false,
  keyboardType: 'default',
  maxLength: 10000,
  placeholderLabel: '',
  mask: '',
  autoFocus: false,
  usePropsValue: false,
  onFocus: () => {},
  onBlur: () => {},
  multiline: false,
  renderAccessory: null,
  returnKeyType: null,
  onSubmitEditing: () => {},
  blurOnSubmit: true,
  autoCapitalize: 'none',
  editable: true,
};

Input.propTypes = {
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  style: ViewPropTypes.style,
  errorStyle: Text.propTypes.style,
  textContentType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  placeholderLabel: PropTypes.string,
  mask: PropTypes.string,
  autoFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  multiline: PropTypes.bool,
  renderAccessory: PropTypes.func,
  usePropsValue: PropTypes.bool,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  editable: PropTypes.bool,
};
