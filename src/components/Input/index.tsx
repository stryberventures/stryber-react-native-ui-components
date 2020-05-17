import React from 'react';
import {TextInputProps} from 'react-native';
import InputSimple from './InputSimple';
import InputLined from './InputLined';

interface IInputProps extends TextInputProps {
  variant: 'simple' | 'lined';
}
const Input = ({variant, ...props}: IInputProps) => {
  const InputComponent = variant === 'lined' ? InputLined : InputSimple;
  // @ts-ignore
  return <InputComponent {...props} />;
};
Input.defaultProps = {
  variant: 'simple',
};
export default Input;
