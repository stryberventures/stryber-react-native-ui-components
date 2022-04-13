import React, {forwardRef} from 'react';
import {View} from 'react-native';

import {NUMBER_OF_LINES, MAX_NUMBER_OF_LINES} from '../constants';
import Text from '../../Text';
import InputBase, {IInputBaseProps} from '../InputBase';
import {getStyles} from './styles';
import {useTheme} from '../../Theme';

export interface IInputSimpleProps extends Omit<IInputBaseProps, 'theme'> {
  name?: string;
  type?: 'email' | 'phone' | 'number' | 'default';
  label?: string;
  error?: string;
  inputLabelStyle?: any;

  // native input props
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number; // how to be with multiline ?
  numberOfLines?: number;
  maxNumberOfLines?: number;

  // specific props
  icon?: () => any;
  rightIcon?: () => any;
}

const InputSimple = forwardRef<InputBase, IInputSimpleProps>(
  (
    {label, disabled, error, icon, rightIcon, inputLabelStyle, ...rest},
    ref,
  ) => {
    const {theme} = useTheme();
    const styles = getStyles({
      theme,
      error: !!error,
      disabled,
    });

    return (
      <InputBase
        {...rest}
        error={error}
        disabled={disabled!}
        theme={theme}
        ref={ref}
        renderPrefix={() => (
          <View style={styles.labelContainer}>
            <Text style={[styles.labelText, inputLabelStyle]}>{label}</Text>
          </View>
        )}
        renderInputLeft={() => (
          <>{!!icon && <View style={styles.iconContainer}>{icon!()}</View>}</>
        )}
        renderInputRight={() => (
          <>
            {!!rightIcon && (
              <View style={styles.rightIconContainer}>{rightIcon!()}</View>
            )}
          </>
        )}
      />
    );
  },
);

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

export default InputSimple;
