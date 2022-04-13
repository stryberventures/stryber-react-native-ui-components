import React, {FC} from 'react';
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import getStyles from './styles';
import {useTheme} from '../../Theme';

export interface IProgressDotsProps extends ViewProps {
  size: 'small' | 'large';
  value: number;
  totalValue: number;
  style?: StyleProp<ViewStyle>;
}

const ProgressDots: FC<IProgressDotsProps> = ({
  value,
  totalValue,
  size,
  style,
  ...rest
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme, size, totalValue);

  const initializeDots = () => {
    const dots = [];
    for (let i = 0; i < totalValue; i++) {
      i === value - 1
        ? dots.push(<View style={[styles.dot, styles.current]} />)
        : dots.push(<View style={styles.dot} />);
    }
    return dots;
  };

  return (
    <View style={[styles.wrapper, style]} {...rest}>
      {initializeDots()}
    </View>
  );
};

export default ProgressDots;
