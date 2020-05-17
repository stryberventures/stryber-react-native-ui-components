import React, {Component} from 'react';
import {TextInputProps} from 'react-native';
import withTheme from '../../withTheme';

import {NUMBER_OF_LINES, MAX_NUMBER_OF_LINES} from '../constants';
import Label from '../../Label';
import InputBase from '../InputBase';
import {getClasses} from './styles';

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
}
class InputSimple extends Component<IInputSimpleProps> {
  static defaultProps: any;

  render() {
    const {theme, label, disabled, error, ...props} = this.props;
    const classes = getClasses({
      theme,
    });

    return (
      <InputBase
        error={error}
        disabled={disabled!}
        renderPrefix={() => (
          <Label disabled={disabled} error={!!error} classes={classes.label}>
            {label}
          </Label>
        )}
        {...props}
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
