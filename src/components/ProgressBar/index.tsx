import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import withTheme from '../withTheme';
import getStyles from './styles';

export interface IProgressBarProps {
  size: 'small' | 'large';
  type: 'steps' | 'inline';
  value: number;
  totalValue: number;
  title?: string;
  theme?: any;
  style?: any;
  infoShowed?: boolean;
}
class ProgressBar extends Component<IProgressBarProps> {
  static defaultProps: any;

  render() {
    const {
      size,
      value,
      totalValue,
      infoShowed,
      theme,
      type,
      ...props
    } = this.props;
    const styles = getStyles(theme, this.props);

    const getStepsProgress = () => {
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
    const getInlineProgress = () => {
      return <>
        { 
          infoShowed && <View style={styles.info}>
            <Text>{props.title}</Text>
            <Text>{value}</Text>
          </View>
        }
        <View style={styles.inlineBar}>
          <View style={[StyleSheet.absoluteFill, styles.inlineProgress]} />
        </View>
      </>
    }
    
    return (
      <View style={styles.container}>
        { type === 'inline' ? getInlineProgress() : getStepsProgress() }
      </View>
    );
  }
}
ProgressBar.defaultProps = {
  style: {},
  size: 'small',
  title: 'Title',
  type: 'inline',
  value: 4,
  totalValue: 4,
  infoShowed: false
};
export default withTheme(ProgressBar);