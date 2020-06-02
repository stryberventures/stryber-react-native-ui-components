import React, {Component} from 'react';
import InputSimple, {IInputSimpleProps} from './InputSimple';
import InputLined, {IInputLinedProps} from './InputLined';

interface IInputPropsComponent extends IInputSimpleProps, IInputLinedProps {
  variant?: 'simple' | 'lined';
  inputBaseRef: React.Ref<unknown>;
}
export type IInputProps = Omit<IInputPropsComponent, 'inputBaseRef' | 'theme'>;

class Input extends Component<IInputPropsComponent> {
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
export default React.forwardRef<Input, IInputProps>((props, ref) => (
  <Input {...props} inputBaseRef={ref} />
));
