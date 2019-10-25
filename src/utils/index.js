import React, {useMemo} from 'react';
import Animated, {Easing} from 'react-native-reanimated';
import {Platform, Dimensions} from 'react-native';

const {
  Clock,
  Value,
  block,
  cond,
  stopClock,
  set,
  startClock,
  clockRunning,
  not,
  timing: reTiming,
  useCode,
  Extrapolate,
  interpolate,
  round,
  color,
  multiply,
  lessThan,
  divide,
  sub,
  abs,
  add,
  modulo,
} = Animated;

export const isIphoneX = () =>
  Platform.OS === 'ios' &&
  !isTablet() &&
  !Platform.isTVOS &&
  (Dimensions.get('window').height === 812 ||
    Dimensions.get('window').width === 812 ||
    Dimensions.get('window').height === 896 ||
    Dimensions.get('window').width === 896);

export const isTablet = () => Platform.isPad;

export const handleOffset = size => {
  if (typeof size === 'number') {
    return {
      marginTop: size,
      marginRight: size,
      marginBottom: size,
      marginLeft: size,
    };
  }

  if (typeof size === 'object') {
    const marginSize = Object.keys(size).length;
    switch (marginSize) {
      case 1:
        return {
          marginTop: size[0],
          marginRight: size[0],
          marginBottom: size[0],
          marginLeft: size[0],
        };
      case 2:
        return {
          marginTop: size[0],
          marginRight: size[1],
          marginBottom: size[0],
          marginLeft: size[1],
        };
      case 3:
        return {
          marginTop: size[0],
          marginRight: size[1],
          marginBottom: size[2],
          marginLeft: size[1],
        };
      default:
        return {
          marginTop: size[0],
          marginRight: size[1],
          marginBottom: size[2],
          marginLeft: size[3],
        };
    }
  }
};

const onInit = (clock, sequence) => cond(not(clockRunning(clock)), sequence);

const animate = ({fn, clock, state, config, from}) =>
  block([
    onInit(clock, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, from),
      startClock(clock),
    ]),
    fn(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);

export const timing = params => {
  const {clock, easing, duration, from, to} = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    from: 0,
    to: 1,
    ...params,
  };

  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    duration,
    easing,
  };

  return block([
    onInit(clock, [set(config.toValue, to), set(state.frameTime, 0)]),
    animate({
      clock,
      fn: reTiming,
      state,
      config,
      from,
    }),
  ]);
};

export const useTransition = (state, src, dest, duration = 400, easing) => {
  if (!React.useMemo) {
    throw new Error(
      'useTransition() is only available in React Native 0.59 or higher.',
    );
  }
  if (!useCode) {
    throw new Error(
      'useCode() is only available in Reanimated 1.0.0 or higher',
    );
  }
  const {transitionVal} = useMemo(
    () => ({
      transitionVal: new Value(0),
    }),
    [],
  );
  useCode(
    set(
      transitionVal,
      timing({
        from: src,
        to: dest,
        duration,
        easing,
      }),
    ),
    [state],
  );
  return transitionVal;
};

export const bin = value => (value ? 1 : 0);

function match(condsAndResPairs, offset = 0) {
  if (condsAndResPairs.length - offset === 1) {
    return condsAndResPairs[offset];
  }
  if (condsAndResPairs.length - offset === 0) {
    return undefined;
  }
  return cond(
    condsAndResPairs[offset],
    condsAndResPairs[offset + 1],
    match(condsAndResPairs, offset + 2),
  );
}

function colorHSV(h, s, v) {
  const c = multiply(v, s);
  const hh = divide(h, 60);
  const x = multiply(c, sub(1, abs(sub(modulo(hh, 2), 1))));

  const m = sub(v, c);

  const colorRGB = (r, g, b) =>
    color(
      round(multiply(255, add(r, m))),
      round(multiply(255, add(g, m))),
      round(multiply(255, add(b, m))),
    );
  return match([
    lessThan(h, 60),
    colorRGB(c, x, 0),
    lessThan(h, 120),
    colorRGB(x, c, 0),
    lessThan(h, 180),
    colorRGB(0, c, x),
    lessThan(h, 240),
    colorRGB(0, x, c),
    lessThan(h, 300),
    colorRGB(x, 0, c),
    colorRGB(c, 0, x),
  ]);
}

const rgbToHsv = c => {
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;

  const ma = Math.max(r, g, b);
  const mi = Math.min(r, g, b);
  let h = 0;
  const v = ma;

  const d = ma - mi;
  const s = ma === 0 ? 0 : d / ma;
  if (ma === mi) {
    h = 0; // achromatic
  } else {
    switch (ma) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default: // do nothing
    }
    h /= 6;
  }
  return {h: h * 360, s, v};
};

const interpolateColorsHSV = (animationValue, inputRange, colors) => {
  const colorsAsHSV = colors.map(c => rgbToHsv(c));
  const h = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.h),
    extrapolate: Extrapolate.CLAMP,
  });
  const s = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.s),
    extrapolate: Extrapolate.CLAMP,
  });
  const v = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.v),
    extrapolate: Extrapolate.CLAMP,
  });
  return colorHSV(h, s, v);
};

const interpolateColorsRGB = (animationValue, inputRange, colors) => {
  const r = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => c.r),
      extrapolate: Extrapolate.CLAMP,
    }),
  );
  const g = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => c.g),
      extrapolate: Extrapolate.CLAMP,
    }),
  );
  const b = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => c.b),
      extrapolate: Extrapolate.CLAMP,
    }),
  );
  return color(r, g, b);
};

export const interpolateColor = (value, config, colorSpace) => {
  const {inputRange, outputRange} = config;
  if (colorSpace === 'hsv') {
    return interpolateColorsHSV(value, inputRange, outputRange);
  }
  return interpolateColorsRGB(value, inputRange, outputRange);
};
