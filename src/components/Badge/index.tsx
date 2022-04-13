import React, {FC} from 'react';
import Text from '../Text';
import getStyles from './styles';
import Block, {IBlockProps} from '../Block';
import {StyleProp, ViewStyle} from 'react-native';
import {useTheme} from '../Theme';

export interface IBadgeProps extends Omit<IBlockProps, 'style'> {
  value?: string | number;
  textStyle?: any;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const Badge: FC<IBadgeProps> = ({value, textStyle, style, onPress, color}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme, color);

  return (
    <Block
      center
      middle
      card
      onPress={onPress}
      style={[styles.badge, style] as ViewStyle}>
      <Text size={theme.fonts.caption.fontSize - 2} white style={textStyle}>
        {value}
      </Text>
    </Block>
  );
};

Badge.defaultProps = {
  value: '',
  textStyle: {},
  style: {},
  color: '',
};
export default Badge;
