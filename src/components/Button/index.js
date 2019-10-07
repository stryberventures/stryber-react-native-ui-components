import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import getStyles from './styles';
import withTheme from '../withTheme';

class Button extends Component {
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
      ...props
    } = this.props;
    const styles = getStyles(theme);

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style,
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}>
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[
              startColor || styles.primary.backgroundColor,
              endColor || styles.secondary.backgroundColor,
            ]}>
            {children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: 'transparent',
};

export default withTheme(Button);
