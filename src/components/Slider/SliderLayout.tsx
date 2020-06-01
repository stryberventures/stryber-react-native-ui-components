import React from 'react';
import {View} from 'react-native';

interface ISliderLayoutProps {
  type?: string;
  styles: any;
  leftLabel: React.ReactNode;
  rightLabel: React.ReactNode;
  rangeBar: React.ReactNode;
}
const SliderLayout = ({
  type = 'regular',
  styles,
  leftLabel,
  rightLabel,
  rangeBar,
}: ISliderLayoutProps) => {
  if (type === 'labelHidden') {
    return (
      <View>
        <View style={styles.rangeBarContainer}>{rangeBar}</View>
      </View>
    );
  }

  if (type === 'labelBottom') {
    return (
      <View>
        <View style={styles.rangeBarContainer}>{rangeBar}</View>
        <View style={styles.labelsBottomContainer}>
          <View style={styles.leftBottomLabelContainer}>{leftLabel}</View>
          <View style={styles.rightBottomLabelContainer}>{rightLabel}</View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftLabelContainer}>{leftLabel}</View>
      <View style={styles.rangeBarContainer}>{rangeBar}</View>
      <View style={styles.rightLabelContainer}>{rightLabel}</View>
    </View>
  );
};

export default SliderLayout;
