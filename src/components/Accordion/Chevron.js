import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import {interpolateColor} from '../../utils';

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ({transition}) => {
  const rotateZ = Animated.interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [Math.PI, 0],
  });
  const backgroundColor = interpolateColor(transition, {
    inputRange: [0, 1],
    outputRange: [{r: 82, g: 82, b: 81}, {r: 228, g: 86, b: 69}],
  });
  return (
    <Animated.View
      style={[styles.container, {transform: [{rotateZ}], backgroundColor}]}>
      <Icon name="ios-arrow-down" color="white" size={24} />
    </Animated.View>
  );
};
