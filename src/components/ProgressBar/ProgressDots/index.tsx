import React, {Component} from 'react';
import { View } from 'react-native';
import withTheme from '../../withTheme';
import getStyles from './styles';

export interface IProgressDotsProps {
  size: 'small' | 'large';
  value: number;
  totalValue: number;
  theme?: any;
}
class ProgressDots extends Component<IProgressDotsProps> {
  static defaultProps: any;

  render() {
  const {
    size,
    value,
    totalValue,
    theme,
    // @ts-ignore
    ...props
  } = this.props;
  const styles = getStyles(theme, this.props);
  const initializeDots = () => {
    const dots = [];
    for (let i = 0; i < totalValue; i++) {
      i == value -1
      ? dots.push(<View style={[styles.dot, styles.current]} />)
      : dots.push(<View style={styles.dot} />)
    }
    return dots;
  }
    return (
      <View style={styles.wraper}>
        {initializeDots()}
      </View>
    );
  }
}

export default withTheme(ProgressDots);
