import React, {Component} from 'react';
import {
  TextInput,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  TextInputProps,
  View,
} from 'react-native';
import withTheme from '../withTheme';
import Text from '../Text';
import Block from '../Block';
import Button from '../Button';
import getStyles from './styles';
import {Eye, EyeDisabled} from '../Icons';
import {MIN_NUMBER_OF_LINES, MAX_NUMBER_OF_LINES} from './constants';

interface IInputProps extends TextInputProps {
  iconBackground?: boolean;
  name?: string;
  onChange?: (...args: any[]) => any;
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  secure?: boolean;
  style?: any;
  theme?: {
    sizes?: any;
    colors: any;
  };
  onFocus?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;
  disabled?: boolean;
  placeholderLabel?: string;
  placeholder?: string;
  labelOnTop?: boolean;
  required?: boolean;
  withLeftBorder?: boolean;
  icon?: (...args: any[]) => any;
  borderColor?: string;
  error?: string;
  errorStyle?: any;
  rightLabel?: (...args: any[]) => any;
  rightStyle?: any;
  onRightPress?: (...args: any[]) => any;
  mask?: string;
  maxLength?: number;
  props?: any;
  length?: any;
  multiline?: boolean;
  minNumberOfLines?: number;
  maxNumberOfLines?: number;
}
type InputState = {
  setValue?: any;
  translateY?: any;
  animated?: {
    translateY: any;
    placeholder: {fontSize: any; fontColor: any; positionTop: any};
  };
  positionTop?: any;
  placeholder?: {fontSize: any; fontColor: any; positionTop: any};
  fontSize?: any;
  movePlaceholder?: boolean;
  value?: any;
  toggleSecure?: boolean;
  start?: any;
  focused?: boolean;
};
class Input extends Component<IInputProps, InputState> {
  static defaultProps: any;
  state = {
    animated: {
      translateY: new Animated.Value(0),
      placeholder: {
        fontSize: new Animated.Value(this!.props!.theme!.sizes!.font || 14),
        fontColor: new Animated.Value(0.0001),
        positionTop: new Animated.Value(13),
      },
    },
    movePlaceholder: false,
    toggleSecure: false,
    isBackspace: false,
    value: this.props.value || '',
    focused: false,
  };
  inputRef = React.createRef();
  constructor(props: IInputProps) {
    super(props);
    if (this.props.value) {
      this.state.movePlaceholder = true;
      this.state.animated.placeholder.fontSize.setValue(12);
      this.state.animated.placeholder.positionTop.setValue(8);
      this.state.animated.translateY.setValue(1);
    }
  }
  applyMask = (mask: string) => {
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
    if (this!.props!.mask!.length && !this.state.isBackspace) {
      value = this.applyMask(this!.props!.mask!);
    } else {
      value = this.state.value;
    }
    return value;
  };
  setValue(value: any) {
    this.setState({value});
  }
  renderLabel = () => {
    const {
      theme,
      placeholder,
      required,
      error,
      labelOnTop,
      disabled,
    } = this.props;
    const {movePlaceholder} = this.state;
    const styles = getStyles({
      // @ts-ignore
      theme,
      additionalPaddingLeft: this.getAdditionalPadding(),
    });

    if (labelOnTop) {
      return (
        <View style={[styles.placeholderOnTop]}>
          <Text
            style={[
              styles.placeholderText,
              styles.placeholderTextOnTop,
              error ? styles.placeholderTextError : {},
              disabled ? styles.placeholderTextOnTopDisabled : {},
            ]}>
            {`${placeholder} ${required ? '*' : ''}`}
          </Text>
        </View>
      );
    }

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
          // @ts-ignore
          shouldRasterizeIOS
          renderToHardwareTextureAndroid
          style={[
            styles.placeholderText,
            styles.placeholderAnimatedText,
            {fontSize: this.state.animated.placeholder.fontSize},
            error ? styles.placeholderAnimatedTextError : {},
          ]}>
          {`${placeholder} ${required ? '*' : ''}`}
        </Animated.Text>
      </Animated.View>
    );
  };
  renderToggle() {
    const {secure, theme} = this.props;
    const {toggleSecure} = this.state;
    // @ts-ignore
    const styles = getStyles({theme});
    if (!secure) {
      return null;
    }
    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({toggleSecure: !toggleSecure})}>
        {!toggleSecure ? <Eye /> : <EyeDisabled />}
      </Button>
    );
  }
  renderRight() {
    const {rightLabel, rightStyle, onRightPress, theme} = this.props;
    // @ts-ignore
    const styles = getStyles({theme});
    if (!rightLabel!()) {
      return null;
    }
    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}>
        {rightLabel!()}
      </Button>
    );
  }
  renderError() {
    const {theme, errorStyle, error} = this.props;
    // @ts-ignore
    const styles = getStyles({theme});

    return <Text style={[errorStyle, styles.error]}>{error}</Text>;
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
            toValue: 8,
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
    const {withLeftBorder, icon, iconBackground} = this.props;
    if (!icon!() && withLeftBorder) return 11;
    else if (icon!() && iconBackground) return 45;
    else if (icon!()) return 30;
    else return 0;
  };
  getBlockBackgroundColor = () => {
    const {theme, disabled, error} = this.props;
    if (disabled) {
      return theme!.colors.gray15;
    } else if (error) {
      return theme!.colors.accent;
    }
    return theme!.colors.primary;
  };
  render() {
    const {
      name,
      onChange,
      email,
      phone,
      number,
      secure,
      style,
      theme,
      onFocus,
      onBlur,
      disabled,
      placeholderLabel,
      placeholder,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      required,
      withLeftBorder,
      icon,
      borderColor,
      error,
      iconBackground,
      maxLength,
      multiline,
      minNumberOfLines,
      maxNumberOfLines,
      labelOnTop,
      ...props
    } = this.props;
    const {toggleSecure, focused, movePlaceholder} = this.state;
    const styles = getStyles({
      // @ts-ignore
      theme,
      focused,
      disabled,
      // @ts-ignore
      error,
      additionalPaddingLeft: this.getAdditionalPadding(),
      disablePaddingRight: secure,
      borderColor,
      movePlaceholder,
      multiline,
      minNumberOfLines,
      maxNumberOfLines,
      labelOnTop,
    });
    const isSecure = toggleSecure ? false : secure;
    const inputStyles = [
      styles.input,
      style,
      borderColor && {borderColor: borderColor},
      error && {borderColor: theme!.colors.accent},
      focused && styles.inputFocused,
    ];
    const ref = this.inputRef;
    const inputType = email
      ? 'email-address'
      : number
      ? 'numeric'
      : phone
      ? 'phone-pad'
      : 'default';
    const editable = placeholderLabel ? !placeholderLabel : !disabled;
    return (
      <Block flex={0}>
        {labelOnTop && this.renderLabel()}
        <Block
          flex={0}
          style={styles.container}
          margin={[theme!.sizes!.base!, 0]}>
          {/*
  // @ts-ignore */}
          <TouchableWithoutFeedback onPress={() => ref.current.focus()}>
            <Block flex={0} style={inputStyles}>
              {!icon!() && withLeftBorder && (
                <Block
                  color={this.getBlockBackgroundColor()}
                  style={styles.leftBorder}
                />
              )}
              {!!icon!() && iconBackground ? (
                <Block style={styles.leftBlock}>
                  <Block
                    style={styles.additionalLeftBlock}
                    color={this.getBlockBackgroundColor()}
                  />
                  <Block
                    style={styles.rotatedBlock}
                    color={this.getBlockBackgroundColor()}
                  />
                  {icon!()}
                </Block>
              ) : (
                <Block style={styles.leftBlock}>{icon!()}</Block>
              )}
              <Block
                animated
                style={{
                  transform: labelOnTop
                    ? []
                    : [
                        {
                          translateY: this.state.animated.translateY.interpolate(
                            {
                              inputRange: [0, 1],
                              outputRange: [0, 7],
                            },
                          ),
                        },
                      ],
                }}>
                <TextInput
                  secureTextEntry={isSecure}
                  autoComplete="off"
                  maxLength={maxLength}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInput}
                  multiline={multiline}
                  numberOfLines={(multiline && minNumberOfLines) || 1}
                  onFocus={() => {
                    this.animate();
                    this.setState({focused: true}, () =>
                      onFocus!(this.state.value),
                    );
                  }}
                  onBlur={() => {
                    this.animate();
                    this.setState({focused: false}, () =>
                      onBlur!(this.state.value),
                    );
                  }}
                  keyboardType={inputType}
                  onChangeText={val => {
                    this.setState(prevState => ({
                      value: val,
                      isBackspace: prevState.value.length >= val.length,
                    }));
                    onChange!(val, name);
                  }}
                  // @ts-ignore
                  ref={ref}
                  editable={editable}
                  placeholder={placeholder || placeholderLabel}
                  placeholderTextColor={theme!.colors.gray15}
                  {...props}
                  value={this.getValue()}
                />
              </Block>
              <Block style={styles.rightBlock}>{this.renderToggle()}</Block>
              {this.renderRight()}
            </Block>
          </TouchableWithoutFeedback>
          {!labelOnTop && this.renderLabel()}
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
  error: '',
  iconBackground: true,
  value: '',
  name: '',
  email: false,
  phone: false,
  number: false,
  secure: false,
  required: false,
  disabled: false,
  multiline: false,
  labelOnTop: false,
  minNumberOfLines: MIN_NUMBER_OF_LINES,
  maxNumberOfLines: MAX_NUMBER_OF_LINES,
  borderColor: '',
  style: {},
  errorStyle: {},
  rightLabel: () => {},
  rightStyle: {},
  onRightPress: () => {},
};
export default withTheme(Input);
