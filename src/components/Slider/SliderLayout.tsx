import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

export interface ISliderLayoutProps {
  type?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  styles: any;
  leftLabel: React.ReactNode;
  rightLabel: React.ReactNode;
  rangeBar: React.ReactNode;
}
const SliderLayout = ({
  type = 'regular',
  wrapperStyle,
  styles,
  leftLabel,
  rightLabel,
  rangeBar,
}: ISliderLayoutProps) => {
  if (type === 'labelHidden') {
    return (
      <View style={wrapperStyle}>
        <View style={styles.rangeBarContainer}>{rangeBar}</View>
      </View>
    );
  }

  if (type === 'labelBottom') {
    return (
      <View style={wrapperStyle}>
        <View style={styles.rangeBarContainer}>{rangeBar}</View>
        <View style={styles.labelsBottomContainer}>
          <View style={styles.leftBottomLabelContainer}>{leftLabel}</View>
          <View style={styles.rightBottomLabelContainer}>{rightLabel}</View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, wrapperStyle]}>
      <View style={styles.leftLabelContainer}>{leftLabel}</View>
      <View style={styles.rangeBarContainer}>{rangeBar}</View>
      <View style={styles.rightLabelContainer}>{rightLabel}</View>
    </View>
  );
};

export default SliderLayout;
