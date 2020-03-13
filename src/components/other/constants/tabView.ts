import {Easing} from 'react-native-reanimated';
export const LOLLIPOP = 21;
export const TRUE = 1;
export const FALSE = 0;
export const NOOP = 0;
export const UNSET = -1;
export const DIRECTION_LEFT = 1;
export const DIRECTION_RIGHT = -1;
export const SWIPE_DISTANCE_MINIMUM = 20;
export const SPRING_CONFIG = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};
export const TIMING_CONFIG = {
  duration: 200,
  easing: Easing.out(Easing.cubic),
};
