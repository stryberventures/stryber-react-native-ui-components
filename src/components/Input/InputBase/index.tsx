import React, {Component} from 'react';
import {
  TextInput,
  TouchableWithoutFeedback,
  TextInputProps,
  View,
  KeyboardType,
} from 'react-native';

import withTheme from '../../withTheme';
import {NUMBER_OF_LINES, MAX_NUMBER_OF_LINES} from '../constants';
import {Eye, EyeDisabled} from '../../Icons';
import Text from '../../Text';
import Button from '../../Button';
import Block from '../../Block';
import {getStyles} from './styles';

const keyboardTypes = {
  number: 'numeric' as KeyboardType,
  email: 'email-address' as KeyboardType,
  phone: 'phone-pad' as KeyboardType,
  default: 'default' as KeyboardType,
};
interface IInputBaseProps extends TextInputProps {
  name?: string;
  type?: 'email' | 'phone' | 'number' | 'default';
  mask?: string;
  secure?: boolean;

  // native input props
  value?: string;
  disabled: boolean;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number; // how to be with multiline ?
  numberOfLines?: number;
  maxNumberOfLines?: number;
  onFocus?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;

  theme?: any;

  classes?: any;
  error?: string;
  focused?: boolean;
  renderPrefix?: () => any;
  renderInputLeft?: () => any;
  renderInputRight?: () => any;
  inputWrapperComponent?: React.ComponentType;
  getBaseInput?: (a: any) => any;
  onChange?: (...args: any[]) => any;
  onSetValue: (...args: any[]) => any;
}
type IInputBaseState = {
  focused?: boolean;
  value: any;
  isBackspace?: boolean;
  toggleSecure?: boolean;
};
const DefaultInputWrapper = ({children, style}: any) => {
  return <Block style={style}>{children}</Block>;
};
class InputBase extends Component<IInputBaseProps, IInputBaseState> {
  static defaultProps: any;
  static getDerivedStateFromProps(
    nextProps: IInputBaseProps,
    nextState: IInputBaseState,
  ) {
    if (nextProps.focused !== nextState.focused) {
      return {
        focused: nextProps.focused,
      };
    }
    return {
      focused: nextState.focused,
    };
  }
  inputRef = React.createRef();
  inputWrapper?: React.ComponentType;

  constructor(props: IInputBaseProps) {
    super(props);

    this.state = {
      focused: false,
      value: this.props.value,
      toggleSecure: false,
    };

    this.inputWrapper = this.props.inputWrapperComponent || DefaultInputWrapper;
    this.props.getBaseInput!(this);
  }

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

  applyDigitMask = (mask: string) => {
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
      value = this.applyDigitMask(this!.props!.mask!);
    } else {
      value = this.state.value;
    }
    return value;
  };
  setValue = (value: any) => {
    this.setState({value});
    this.props.onSetValue(value);
  };

  onInputBoxPress = () => {
    // @ts-ignore
    this.inputRef.current.focus();
  };

  onFocus = () => {
    this.setState({
      focused: true,
    });

    this.props.onFocus!();
  };

  onBlur = () => {
    this.setState({
      focused: false,
    });

    this.props.onBlur!();
  };

  render() {
    const {
      type,
      name,
      multiline,
      numberOfLines,
      maxNumberOfLines,
      renderPrefix,
      renderInputLeft,
      renderInputRight,
      disabled,
      error,
      theme,
      secure,
      classes,
      onChange,
      ...props
    } = this.props;
    const {toggleSecure} = this.state;
    const styles = getStyles({
      theme,
      multiline,
      numberOfLines,
      maxNumberOfLines,
      classes,
    });
    const isSecure = toggleSecure ? false : secure;
    const InputWrapper = this.inputWrapper;
    return (
      <View style={styles.container}>
        {renderPrefix!()}
        <TouchableWithoutFeedback
          onPress={this.onInputBoxPress}
          disabled={disabled}>
          {}
          <View
            style={[
              styles.inputBox,
              disabled ? styles.inputBoxDisabled : {},
              this.state.focused ? styles.inputBoxFocused : {},
              error ? styles.inputBoxError : {},
            ]}>
            {renderInputLeft!()}
            {/*
            // @ts-ignore */}
            <InputWrapper style={styles.inputWrapper}>
              <TextInput
                {...props}
                // @ts-ignore
                ref={this.inputRef}
                value={this.getValue()}
                secureTextEntry={isSecure}
                multiline={multiline}
                numberOfLines={numberOfLines}
                style={styles.input}
                keyboardType={keyboardTypes[type!]}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChangeText={val => {
                  this.setState(prevState => ({
                    value: val,
                    isBackspace: prevState.value.length >= val.length,
                  }));
                  onChange!(val, name);
                }}
              />
            </InputWrapper>
            <Block style={styles.toggleWrapper}>{this.renderToggle()}</Block>
            {renderInputRight!()}
          </View>
        </TouchableWithoutFeedback>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
}
InputBase.defaultProps = {
  value: '',
  type: 'default',
  mask: '',
  secure: false,
  numberOfLines: NUMBER_OF_LINES,
  maxNumberOfLines: MAX_NUMBER_OF_LINES,
  inputRef: () => {},
  renderPrefix: () => {},
  renderPostfix: () => {},
  renderInputLeft: () => {},
  renderInputRight: () => {},
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  getBaseInput: () => {},
  onSetValue: () => {},
};
export default withTheme(InputBase);