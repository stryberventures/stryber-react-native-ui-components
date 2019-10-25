import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import getStyles from './styles';
import withTheme from '../withTheme';
import Ripple from '../Ripple';

class Button extends React.Component {
  ripple = React.createRef();

  renderRipple() {
    const {
      baseColor,
      rippleColor = baseColor,
      rippleOpacity,
      rippleDuration,
      rippleCentered,
      rippleSequential,
      rippleInsets,
      theme,
      style,
      ripple,
    } = this.props;

    if (!ripple) {
      return null;
    }

    let allStyles;
    if (style && style.length) {
      allStyles = style.reduce((obj, styleObj) => {
        return Object.assign(obj, styleObj);
      }, {});
    } else {
      allStyles = style;
    }

    const rippleStyles = {
      ...rippleInsets,

      top: allStyles
        ? allStyles.margin || allStyles.marginVertical || allStyles.marginTop
        : theme.sizes.padding / 3,
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
        rippleContainerBorderRadius={theme.sizes.radius}
        ref={this.ripple}
      />
    );
  }

  handlePress = event => {
    const {rippleInsets, onPress, ripple} = this.props;
    if (event != null && ripple) {
      /* Adjust event location */
      const eventLocation = {
        locationY: event.nativeEvent.locationY - rippleInsets.top,
        locationX: event.nativeEvent.locationX - rippleInsets.left,
      };

      /* Start ripple directly from event */
      this.ripple.current.startRipple(eventLocation);
    }
    onPress(event);
  };

  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      theme,
      border,
      Component = gradient ? LinearGradient : View,
      ...props
    } = this.props;
    const styles = getStyles(theme);

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color],
      color && !styles[color] && {backgroundColor: color},
      border && {
        borderColor: theme.colors.primary,
        borderWidth: theme.sizes.borderWidth,
      },
      style,
    ];

    let gradientProps = {};

    if (gradient) {
      gradientProps = {
        start: start,
        end: end,
        locations: locations,
        colors: [
          startColor || styles.primary.backgroundColor,
          endColor || styles.secondary.backgroundColor,
        ],
      };
    }

    return (
      <TouchableOpacity
        {...props}
        activeOpacity={opacity || 0.8}
        onPress={this.handlePress}
        style={buttonStyles}>
        <View pointerEvents="box-only">
          <Component style={buttonStyles} {...gradientProps}>
            {children}
          </Component>
          {this.renderRipple()}
        </View>
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  onPress: () => {},
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: 'transparent',
  //Ripple
  baseColor: 'rgba(0, 0, 0, .38)',
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
};

export default withTheme(Button);
