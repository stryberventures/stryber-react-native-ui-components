import React, {FC} from 'react';
import {Animated, StyleProp, Text, TextProps, TextStyle} from 'react-native';
import getStyles from './styles';
import {useTheme} from '../Theme';

export interface ITypographyProps extends TextProps {
  title?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  headline?: boolean;
  body?: boolean;
  button?: boolean;
  subhead?: boolean;
  footnote?: boolean;
  caption?: boolean;
  small?: boolean;
  size?: number;
  transform?: string;
  align?: string;
  regular?: boolean;
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  weight?: string;
  light?: boolean;
  center?: boolean;
  right?: boolean;
  left?: boolean;
  spacing?: number;
  height?: number;
  color?: string;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  gray2?: boolean;
  animated?: boolean;
  style?: StyleProp<TextStyle>;
}

const Typography: FC<ITypographyProps> = ({
  title,
  h1,
  h2,
  h3,
  headline,
  body,
  button,
  subhead,
  footnote,
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
  animated,
  children,
  ...rest
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const textStyles = [
    styles.text,
    title && styles.title,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    headline && styles.headline,
    body && styles.body,
    button && styles.button,
    subhead && styles.subhead,
    footnote && styles.footnote,
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
    color && {color},
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
  const TextComponent = (animated ? Animated.Text : Text) as any;
  return (
    <TextComponent style={textStyles} {...rest}>
      {children}
    </TextComponent>
  );
};

Typography.defaultProps = {
  title: false,
  h1: false,
  h2: false,
  h3: false,
  headline: false,
  body: false,
  button: false,
  subhead: false,
  footnote: false,
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
  color: 'black',
  accent: false,
  primary: false,
  secondary: false,
  tertiary: false,
  black: false,
  white: false,
  gray: false,
  gray2: false,
  animated: false,
  style: {},
};

export default Typography;
