import React, {Component} from 'react';
import {TextInputProps} from 'react-native';
import InputSimple from './InputSimple';
import InputLined from './InputLined';

export interface IInputProps extends TextInputProps {
  variant: 'simple' | 'lined';
  inputBaseRef: React.Ref<unknown>;
}

class Input extends Component<IInputProps> {
  static defaultProps: any;
  render() {
    const {variant, inputBaseRef, ...props} = this.props;
    const InputComponent = variant === 'lined' ? InputLined : InputSimple;
    // @ts-ignore
    return <InputComponent {...props} inputBaseRef={inputBaseRef} />;
  }
}
Input.defaultProps = {
  variant: 'simple',
};
export default React.forwardRef((props, ref) => (
  <Input {...props} inputBaseRef={ref} />
));
