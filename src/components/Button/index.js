import React from 'react';
import {TouchableOpacity, View, ViewPropTypes} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import getStyles from './styles';
import withTheme from '../withTheme';
import Ripple from '../Ripple';
import Block from '../Block';

class Button extends React.Component {
  ripple = React.createRef();

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
      // eslint-disable-next-line react/prop-types
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
        borderColor: typeof border === 'string' ? border : theme.colors.primary,
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
        style: buttonStyles,
      };
    }

    return (
      <TouchableOpacity
        {...props}
        activeOpacity={opacity || 0.8}
        onPress={this.handlePress}
        style={buttonStyles}>
        <Block middle pointerEvents="box-only">
          <Component {...gradientProps}>{children}</Component>
          {this.renderRipple()}
        </Block>
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
  style: {},
  gradient: false,
  shadow: false,
  ripple: false,
};

Button.propTypes = {
  style: ViewPropTypes.style,
  opacity: PropTypes.number,
  gradient: PropTypes.bool,
  color: PropTypes.string,
  start: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  end: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  locations: PropTypes.arrayOf(PropTypes.number),
  shadow: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rippleColor: PropTypes.string,
  rippleOpacity: PropTypes.number,
  rippleDuration: PropTypes.number,
  rippleCentered: PropTypes.bool,
  rippleSequential: PropTypes.bool,
  rippleInsets: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  theme: PropTypes.shape({}).isRequired,
  ripple: PropTypes.bool,
  onPress: PropTypes.func,
  startColor: PropTypes.string,
  endColor: PropTypes.string,
  border: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default withTheme(Button);
