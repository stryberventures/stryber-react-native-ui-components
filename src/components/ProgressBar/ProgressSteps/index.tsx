import React, {FC} from 'react';
import {View, Text, ViewProps, StyleProp, ViewStyle} from 'react-native';
import getStyles from './styles';
import {useTheme} from '../../Theme';

export interface IProgressStepsProps extends ViewProps {
  size: 'small' | 'large';
  value: number;
  totalValue: number;
  style?: StyleProp<ViewStyle>;
}

const ProgressSteps: FC<IProgressStepsProps> = ({
  value,
  totalValue,
  size,
  style,
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme, size, value, totalValue);
  const steps = [];

  for (let i = 0; i < totalValue - value; i++) {
    steps.push(<View style={styles.dot} />);
  }

  return (
    <View style={[styles.stepsBar, style]}>
      <View style={styles.stepsWrapper}>
        <View style={styles.stepsProgress} />
        <View style={styles.dots}>{steps}</View>
      </View>
      <Text style={styles.stepsText}>{`${value}/${totalValue}`}</Text>
    </View>
  );
};

export default ProgressSteps;
