import React, {Component} from 'react';
import {Animated, Easing, View} from 'react-native';
import withTheme from '../../withTheme';

import InputBase, {IInputBaseProps} from '../InputBase';
import Block from '../../Block';
import {getStyles} from './styles';

export interface IInputLinedProps extends IInputBaseProps {
  name?: string;
  inputBaseRef: React.Ref<any>;
  type?: 'email' | 'phone' | 'number' | 'default';
  label?: string;
  error?: string;
  required?: boolean;

  // native input props
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number; // how to be with multiline ?
  numberOfLines?: number;
  maxNumberOfLines?: number;
  onFocus?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;

  style?: any;
  theme: any;
  color?: string;

  // specific props
  icon?: (...args: any[]) => any;
  rightIcon?: (...args: any[]) => any;
  iconBackground?: boolean;
}

interface IInputLibedState {
  translateY?: any;
  animated?: {
    translateY: any;
    label: {fontSize: any; fontColor: any; positionTop: any};
  };
  moveLabel: boolean;
}

class InputLined extends Component<IInputLinedProps, IInputLibedState> {
  static defaultProps: any;
  state = {
    animated: {
      translateY: new Animated.Value(0),
      label: {
        fontSize: new Animated.Value(this!.props!.theme!.sizes!.font || 14),
        fontColor: new Animated.Value(0.0001),
        positionTop: new Animated.Value(0),
      },
    },
    moveLabel: false,
  };

  constructor(props: IInputLinedProps) {
    super(props);
    if (this.props.value && this.props.label) {
      this.state.moveLabel = true;
      this.state.animated.label.fontSize.setValue(12);
      this.state.animated.label.positionTop.setValue(3);
      this.state.animated.translateY.setValue(1);
    }
  }

  animateLabel() {
    if (!this.props.label) {
      return;
    }
    const animatedLabel = !this.state.moveLabel
      ? [
          Animated.timing(this.state.animated.label.fontSize, {
            toValue: 12,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(this.state.animated.label.positionTop, {
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
      ...animatedLabel,
    ]).start();
    this.setState({moveLabel: true});
  }

  renderLabel() {
    const {theme, label, required, disabled, error, color} = this.props;
    const styles = getStyles({
      theme,
      color,
      disabled,
      error: !!error,
    });

    if (!this.state.moveLabel) {
      return null;
    }

    return (
      <Animated.View
        shouldRasterizeIOS
        renderToHardwareTextureAndroid
        style={[styles.label, {top: this.state.animated.label.positionTop}]}>
        <Animated.Text
          // @ts-ignore
          shouldRasterizeIOS
          renderToHardwareTextureAndroid
          style={[
            styles.labelText,
            styles.labelAnimatedText,
            {fontSize: this.state.animated.label.fontSize},
            error ? styles.labelAnimatedTextError : {},
          ]}>
          {`${label} ${required ? '*' : ''}`}
        </Animated.Text>
      </Animated.View>
    );
  }

  render() {
    const {
      theme,
      disabled,
      error,
      icon,
      iconBackground,
      multiline,
      rightIcon,
      inputBaseRef,
      ...props
    } = this.props;
    const styles = getStyles({
      theme,
      color: props.color,
      disabled,
      error: !!error,
      moveLabel: this.state.moveLabel,
    });

    return (
      <InputBase
        {...props}
        ref={inputBaseRef}
        error={error}
        disabled={disabled!}
        multiline={multiline}
        inputWrapperComponent={({children, style}: any) => {
          return (
            <Block style={style}>
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
                  ...styles.textInput,
                }}>
                {children}
              </Block>
              {!!this.props.label && this.renderLabel()}
            </Block>
          );
        }}
        renderInputLeft={() => (
          <>
            {!icon!() && <View style={styles.leftBorder} />}
            {!!icon!() && iconBackground && (
              <View style={[styles.leftBlock, styles.leftBlockWithRotated]}>
                <View style={styles.additionalLeftBlock} />
                <View style={styles.rotatedBlock} />
                <View style={styles.iconContainer}>{icon!()}</View>
              </View>
            )}
            {!!icon!() && !iconBackground && (
              <View
                style={[
                  styles.leftBlock,
                  styles.leftBlockWithNoIconBackground,
                ]}>
                <View style={styles.iconContainer}>{icon!()}</View>
              </View>
            )}
          </>
        )}
        renderInputRight={() => (
          <>
            {!!rightIcon && (
              <View style={styles.rightIconContainer}>{rightIcon!()}</View>
            )}
          </>
        )}
        onFocus={() => {
          this.animateLabel();
          this.props.onFocus!();
        }}
        onBlur={() => {
          this.animateLabel();
          this.props.onBlur!();
        }}
      />
    );
  }
}
InputLined.defaultProps = {
  name: '',
  type: 'default',
  label: '',
  disabled: false,
  required: false,
  placeholder: '',
  multiline: false,
  maxLength: 45, // max length for text area ?
  icon: () => {},
  iconBackground: true,
  onFocus: () => {},
  onBlur: () => {},
};
export default withTheme(InputLined);
