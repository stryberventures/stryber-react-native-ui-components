import React, {Component, forwardRef} from 'react';
import {
  TextInput,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import withTheme from '../withTheme';
import Text from '../Text';
import Block from '../Block';
import Button from '../Button';
import getStyles from './styles';

class Input extends Component {
  state = {
    animated: {
      translateY: new Animated.Value(0),
      placeholder: {
        fontSize: new Animated.Value(this.props.theme.sizes.font || 14),
        fontColor: new Animated.Value(0.0001),
        positionTop: new Animated.Value(13),
      },
    },
    movePlaceholder: false,
    toggleSecure: false,
    isBackspace: false,
    value: this.props.value || '',
    error: this.props.error || '',
    focused: false,
  };
  inputRef = React.createRef();

  constructor(props) {
    super(props);

    if (this.props.value) {
      this.state.movePlaceholder = true;
      this.state.animated.placeholder.fontSize.setValue(12);
      this.state.animated.placeholder.positionTop.setValue(3);
      this.state.animated.translateY.setValue(1);
    }
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

  getValue = () => {
    let value;

    if (this.props.mask.length && !this.state.isBackspace) {
      value = this.applyMask(this.props.mask);
    } else {
      value = this.state.value;
    }

    return value;
  };

  setValue(value) {
    this.setState({value});
  }

  renderLabel = () => {
    const {theme, placeholder, required} = this.props;
    const {movePlaceholder} = this.state;
    const styles = getStyles({
      theme,
      additionalPaddingLeft: this.getAdditionalPadding(),
    });

    if (!movePlaceholder) {
      return null;
    }
    return (
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
          {`${placeholder} ${required ? '*' : ''}`}
        </Animated.Text>
      </Animated.View>
    );
  };

  renderToggle() {
    const {secure, rightLabel, theme} = this.props;
    const {toggleSecure} = this.state;
    const styles = getStyles({theme});

    if (!secure) {
      return null;
    }

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({toggleSecure: !toggleSecure})}>
        {rightLabel ? (
          rightLabel
        ) : (
          <Icon
            color={theme.colors.primary}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )}
      </Button>
    );
  }

  renderRight() {
    const {rightLabel, rightStyle, onRightPress, theme} = this.props;
    const styles = getStyles({theme});

    if (!rightLabel) {
      return null;
    }

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}>
        {rightLabel}
      </Button>
    );
  }

  setError(error) {
    return this.setState({error});
  }

  renderError() {
    const {error} = this.state;
    const {theme, errorStyle} = this.props;
    const styles = getStyles({theme});

    if (!error) {
      return null;
    }

    return (
      <Text light style={[errorStyle, styles.error]}>
        {error}
      </Text>
    );
  }

  animate() {
    const animatedPlaceholder = !this.state.movePlaceholder
      ? [
          Animated.timing(this.state.animated.placeholder.fontSize, {
            toValue: 12,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false,
          }),

          Animated.timing(this.state.animated.placeholder.positionTop, {
            toValue: 3,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]
      : [];

    Animated.parallel([
      Animated.timing(this.state.animated.translateY, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      ...animatedPlaceholder,
    ]).start();

    this.setState({movePlaceholder: true});
  }

  getAdditionalPadding = () => {
    const {withLeftBorder, icon} = this.props;
    return withLeftBorder ? 7 : icon ? 45 : 0;
  };

  getBlockBackgroundColor = () => {
    const {theme, disabled} = this.props;
    const {error} = this.state;

    if (disabled) {
      return theme.colors.gray2;
    } else if (error) {
      return theme.colors.accent;
    }
    return theme.colors.primary;
  };

  render() {
    const {
      name,
      type,
      onChange,
      email,
      phone,
      number,
      secure,
      style,
      theme,
      innerRef,
      onFocus,
      onBlur,
      disabled,
      placeholderLabel,
      placeholder,
      required,
      withLeftBorder,
      icon,
      borderColor,
      ...props
    } = this.props;
    const {toggleSecure, focused, error} = this.state;

    const styles = getStyles({
      theme,
      focused,
      disabled,
      error,
      additionalPaddingLeft: this.getAdditionalPadding(),
      disablePaddingRight: secure,
      borderColor,
    });

    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      error && {borderColor: theme.colors.accent},
      style,
      borderColor && {borderColor: borderColor},
    ];
    const ref = innerRef || this.inputRef;

    const inputType = email
      ? 'email-address'
      : number
      ? 'numeric'
      : phone
      ? 'phone-pad'
      : 'default';

    const editable = placeholderLabel ? !placeholderLabel : !disabled;

    return (
      <Block flex={false}>
        <Block
          flex={false}
          style={styles.container}
          margin={[theme.sizes.base, 0]}>
          <TouchableWithoutFeedback onPress={() => ref.current.focus()}>
            <Block flex={false} style={inputStyles}>
              {withLeftBorder && (
                <Block
                  color={this.getBlockBackgroundColor()}
                  style={styles.leftBorder}
                />
              )}
              {!!icon() && (
                <Block style={styles.leftBlock}>
                  <Block
                    style={styles.additionalLeftBlock}
                    color={this.getBlockBackgroundColor()}
                  />
                  <Block
                    style={styles.rotatedBlock}
                    color={this.getBlockBackgroundColor()}
                  />
                  {icon()}
                </Block>
              )}
              <Block
                animated
                style={{
                  transform: [
                    {
                      translateY: this.state.animated.translateY.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 7],
                      }),
                    },
                  ],
                }}>
                <TextInput
                  secureTextEntry={isSecure}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInput}
                  onFocus={() => {
                    this.animate();
                    this.setState({focused: true}, () =>
                      onFocus(this.state.value),
                    );
                  }}
                  onBlur={() => {
                    this.animate();
                    this.setState({focused: false}, () =>
                      onBlur(this.state.value),
                    );
                  }}
                  keyboardType={inputType}
                  onChangeText={val => {
                    this.setState(prevState => ({
                      error: '',
                      value: val,
                      isBackspace: prevState.value.length >= val.length,
                    }));
                    onChange({name, type, text: val});
                  }}
                  ref={ref}
                  editable={editable}
                  placeholder={placeholder || placeholderLabel}
                  placeholderTextColor={theme.colors.gray2}
                  {...props}
                  value={this.getValue()}
                />
              </Block>
              <Block style={styles.rightBlock}>{this.renderToggle()}</Block>
              {this.renderRight()}
            </Block>
          </TouchableWithoutFeedback>
          {this.renderLabel()}
        </Block>
        {this.renderError()}
      </Block>
    );
  }
}

Input.defaultProps = {
  mask: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  placeholderLabel: '',
  withLeftBorder: true,
  icon: () => {},
  placeholder: '',
};

export default withTheme(
  forwardRef((props, ref) => <Input innerRef={ref} {...props} />),
);
