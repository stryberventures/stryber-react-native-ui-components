import React, {Component} from 'react';
import {TextInputProps, View} from 'react-native';
import withTheme from '../../withTheme';

import {NUMBER_OF_LINES, MAX_NUMBER_OF_LINES} from '../constants';
import Text from '../../Text';
import InputBase from '../InputBase';
import {getStyles} from './styles';

interface IInputSimpleProps extends TextInputProps {
  name?: string;
  type?: 'email' | 'phone' | 'number' | 'default';
  label: string;
  error?: string;

  // native input props
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number; // how to be with multiline ?
  numberOfLines?: number;
  maxNumberOfLines?: number;

  style?: any;
  theme: any;

  // specific props
  icon?: (...args: any[]) => any;
}
class InputSimple extends Component<IInputSimpleProps> {
  static defaultProps: any;

  render() {
    const {theme, label, disabled, error, icon, ...props} = this.props;
    const styles = getStyles({
      theme,
      error: !!error,
      disabled,
    });

    return (
      <InputBase
        {...props}
        error={error}
        disabled={disabled!}
        renderPrefix={() => (
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{label}</Text>
          </View>
        )}
        renderInputLeft={() => (
          <>{!!icon && <View style={styles.iconContainer}>{icon!()}</View>}</>
        )}
      />
    );
  }
}
InputSimple.defaultProps = {
  name: '',
  type: 'default',
  label: '',
  disabled: false,
  placeholder: '',
  multiline: false,
  maxLength: 45, // max length for text area ?
  numberOfLines: NUMBER_OF_LINES,
  maxNumberOfLines: MAX_NUMBER_OF_LINES,
};
export default withTheme(InputSimple);
