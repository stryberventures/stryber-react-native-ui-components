import React, {FC} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import ProgressInline from './ProgressInline';
import ProgressDots from './ProgressDots';
import ProgressSteps from './ProgressSteps';
import getStyles from './styles';

//TODO: Fix types for different progress bars, rewrite progress bars variants render
export interface IProgressBarProps {
  size: 'small' | 'large';
  variant?: 'steps' | 'inline' | 'dots';
  value: number;
  totalValue: number;
  title?: string;
  style?: StyleProp<ViewStyle>;
  infoShowed?: boolean;
}

const ProgressBar: FC<IProgressBarProps> = ({
  variant,
  infoShowed,
  title,
  ...rest
}) => {
  const styles = getStyles();

  const renderProgressVariant = () => {
    switch (variant) {
      case 'inline':
        return (
          <ProgressInline title={title} infoShowed={infoShowed} {...rest} />
        );
      case 'steps':
        return <ProgressSteps {...rest} />;
      case 'dots':
        return <ProgressDots {...rest} />;
      default:
        return <ProgressDots {...rest} />;
    }
  };

  return <View style={styles.container}>{renderProgressVariant()}</View>;
};

ProgressBar.defaultProps = {
  style: {},
  size: 'small',
  title: 'Title',
  variant: 'inline',
  value: 4,
  totalValue: 4,
  infoShowed: false,
};

export default ProgressBar;
