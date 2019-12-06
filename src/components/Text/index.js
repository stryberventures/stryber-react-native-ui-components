import React, {Component} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

import withTheme from '../withTheme';
import getStyles from './styles';

class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      left,
      spacing,
      height,
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      children,
      theme,
      ...props
    } = this.props;
    const styles = getStyles(theme);

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && {fontSize: size},
      transform && {textTransform: transform},
      align && {textAlign: align},
      height && {lineHeight: height},
      spacing && {letterSpacing: spacing},
      weight && {fontWeight: weight},
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      left && styles.left,
      color && styles[color],
      color && !styles[color] && {color},
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      style,
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

Typography.defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  title: false,
  body: false,
  caption: false,
  small: false,
  size: 0,
  transform: 'none',
  align: 'left',
  regular: false,
  bold: false,
  semibold: false,
  medium: false,
  weight: 'normal',
  light: false,
  center: false,
  right: false,
  left: false,
  spacing: 0,
  height: 0,
  color: '',
  accent: false,
  primary: false,
  secondary: false,
  tertiary: false,
  black: false,
  white: false,
  gray: false,
  gray2: false,
  style: {},
};

Typography.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  title: PropTypes.bool,
  body: PropTypes.bool,
  caption: PropTypes.bool,
  small: PropTypes.bool,
  size: PropTypes.number,
  transform: PropTypes.string,
  align: PropTypes.string,
  regular: PropTypes.bool,
  bold: PropTypes.bool,
  semibold: PropTypes.bool,
  medium: PropTypes.bool,
  weight: PropTypes.string,
  light: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
  spacing: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  accent: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  black: PropTypes.bool,
  white: PropTypes.bool,
  gray: PropTypes.bool,
  gray2: PropTypes.bool,
  style: Text.propTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default withTheme(Typography);
