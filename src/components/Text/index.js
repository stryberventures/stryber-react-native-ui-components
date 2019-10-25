import React, {Component} from 'react';
import {Text} from 'react-native';
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

export default withTheme(Typography);
