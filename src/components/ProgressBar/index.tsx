import React, {Component} from 'react';
import { View } from 'react-native';
import ProgressInline from './ProgressInline';
import ProgressDots from './ProgressDots';
import ProgressSteps from './ProgressSteps';
import withTheme from '../withTheme';
import getStyles from './styles';

export interface IProgressBarProps {
  size: 'small' | 'large';
  variant: 'steps' | 'inline' | 'dots';
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
      variant,
      infoShowed,
      title,
      ...props
    } = this.props;
    const styles = getStyles();
    return (
      <View style={styles.container}>
        {
          variant === 'inline' ? 
          <ProgressInline title={title} infoShowed={infoShowed} {...props} />
          : variant === 'steps' 
            ? <ProgressSteps {...props} />
            : <ProgressDots {...props} />
        }
      </View>
    );
  }
}
ProgressBar.defaultProps = {
  style: {},
  size: 'small',
  title: 'Title',
  variant: 'inline',
  value: 4,
  totalValue: 4,
  infoShowed: false
};
export default withTheme(ProgressBar);