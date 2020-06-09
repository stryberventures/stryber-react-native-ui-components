import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import withTheme from '../../withTheme';
import getStyles from './styles';

export interface IProgressStepsProps {
  size: 'small' | 'large';
  value: number;
  totalValue: number;
  theme?: any;
}
class ProgressSteps extends Component<IProgressStepsProps> {
  static defaultProps: any;  

  render() {
  const {
    size,
    value,
    totalValue,
    theme,
    ...props
  } = this.props;
  const styles = getStyles(theme, this.props);
  const steps = [];
  for (let i=0; i<totalValue-value; i++) {
    steps.push(<View style={styles.dot} />)
  }
  return <View style={styles.stepsBar}>
    <View style={styles.stepsWrapper}>
      <View style={styles.stepsProgress} />
      <View style={styles.dots}>
        {steps}
      </View>
    </View>
    <Text style={styles.stepsText}>{`${value}/${totalValue}`}</Text>
  </View>
  }
}

export default withTheme(ProgressSteps);