import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import withTheme from '../withTheme';
import Icons from '../Icons';
import Text from '../Text';
import Ripple from '../Ripple';
import getStyles from './styles';

export interface IButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  type?: 'regular' | 'outlined' | 'link';
  disabled?: boolean;
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleInsets?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  theme?: any;
  shadow?: boolean;
  color?: string;
  secondaryColor?: string;
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'regular' | 'small' | 'mini';
  icon?: keyof typeof Icons | ((...args: any[]) => any);
  iconProps?: any;
  props?: any;
  style?: any;
  underlayColor?: string;
  textStyle?: any;
  onPress?: (...args: any[]) => any;
}
export interface IButtonState {
  isTouched: boolean;
}
class Button extends React.Component<IButtonProps, IButtonState> {
  static defaultProps: any;
  ripple = React.createRef();
  state = {
    isTouched: false,
  };
  renderRipple() {
    const {
      rippleColor,
      rippleOpacity,
      rippleDuration,
      rippleCentered,
      rippleSequential,
      rippleInsets,
      theme,
      ripple,
    } = this.props;
    if (!ripple) {
      return null;
    }
    const styles: any = getStyles(theme, this.props, this.state);
    const rippleStyles = {
      ...rippleInsets,
      top: 0,
      height: theme.sizes.buttonHeight,
      position: 'absolute',
    };
    return (
      <Ripple
        style={rippleStyles}
        rippleColor={rippleColor}
        rippleDuration={rippleDuration}
        rippleOpacity={rippleOpacity}
        rippleCentered={rippleCentered}
        rippleSequential={rippleSequential}
        rippleContainerBorderRadius={styles.button.borderRadius}
        // @ts-ignore
        ref={this.ripple}
      />
    );
  }
  handlePress = (event: any) => {
    const {rippleInsets, onPress, ripple} = this.props;
    if (event != null && ripple) {
      /* Adjust event location */
      const eventLocation = {
        locationY: event.nativeEvent.locationY - rippleInsets!.top!,
        locationX: event.nativeEvent.locationX - rippleInsets!.left!,
      };
      /* Start ripple directly from event */
      // @ts-ignore
      this.ripple.current.startRipple(eventLocation);
    }
    onPress!(event);
  };
  handlePressIn = () => {
    this.setState({
      isTouched: true,
    });
  };
  handlePressOut = () => {
    this.setState({
      isTouched: false,
    });
  };

  render() {
    const {
      style,
      children,
      theme,
      icon,
      iconProps,
      type,
      textStyle,
      ...props
    } = this.props;
    const IconComponent =
      (typeof icon === 'string' && Icons[icon]) ||
      (typeof icon === 'function' && icon);
    const styles: any = getStyles(theme, this.props, this.state);

    return (
      <TouchableOpacity
        {...props}
        activeOpacity={1}
        onPress={this.handlePress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        style={[styles.button, style]}>
        {type === 'link' ? (
          <Text style={[styles.buttonText, textStyle]}>{children}</Text>
        ) : (
          <>
            <View style={styles.content}>
              {icon && (
                <View style={styles.leftIconContainer}>
                  {IconComponent && (
                    <IconComponent fill={styles.icon.color} {...iconProps} />
                  )}
                </View>
              )}
              <Text style={[styles.buttonText, textStyle]}>{children}</Text>
            </View>
            {this.renderRipple()}
            <View style={styles.touchOverlay} />
          </>
        )}
      </TouchableOpacity>
    );
  }
}
Button.defaultProps = {
  type: 'regular',
  disabled: false,
  size: 'regular',
  shape: 'rounded',
  rippleColor: 'rgba(0, 0, 0, .38)',
  rippleCentered: false,
  rippleSequential: true,
  rippleInsets: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  rippleOpacity: 0.54,
  rippleDuration: 400,
  shadow: false,
  ripple: false,
  onPress: () => {},
};
export default withTheme(Button);
