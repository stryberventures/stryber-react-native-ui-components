import React from 'react';
import InputSimple, {IInputSimpleProps} from './InputSimple';
import InputLined, {IInputLinedProps} from './InputLined';
import InputBase from './InputBase';

export interface IInputProps extends IInputSimpleProps, IInputLinedProps {
  variant?: 'simple' | 'lined';
}

const Input = React.forwardRef<InputBase, IInputProps>(
  ({variant, ...rest}, ref) => {
    const getInputComponent = () => {
      switch (variant) {
        case 'lined':
          return InputLined;
        case 'simple':
          return InputSimple;
        default:
          return InputSimple;
      }
    };

    const InputComponent = getInputComponent();

    return <InputComponent ref={ref} {...rest} />;
  },
);

Input.defaultProps = {
  variant: 'simple',
};

export default Input;
