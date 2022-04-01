import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, Animated} from 'react-native';
import getStyles from './styles';
import {useTheme} from '../Theme';

export interface ILoaderProps {
  size: 'small' | 'large';
  dotsAmount: number;
}

const Loader: FC<ILoaderProps> = ({size, dotsAmount}) => {
  const {theme} = useTheme();
  const [dotAnimations, setDotAnimations] = useState<Animated.Value[]>([]);
  const interpolated = dotAnimations.map((dot: Animated.Value) => {
    return dot.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.gray, theme.colors.primary],
    });
  });

  const styles = getStyles(theme, {size, dotsAmount});

  const animateDot = (value: Animated.Value, delay: number) =>
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1,
        duration: 400,
        delay: delay,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: 300,
        delay: 100,
        useNativeDriver: false,
      }),
    ]);

  const initializeAnimation = useCallback(() => {
    const initDotsArr = [];
    for (let i = 0; i < dotsAmount; i++) {
      initDotsArr.push(new Animated.Value(0));
    }
    setDotAnimations(initDotsArr);
  }, [dotsAmount]);

  useEffect(() => {
    const animations: Array<any> = dotAnimations.map(
      (value: Animated.Value, index: number) => animateDot(value, index * 600),
    );
    Animated.parallel(animations).start(() => initializeAnimation());
  }, [dotAnimations, initializeAnimation]);

  useEffect(() => {
    initializeAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {interpolated.map((value, index) => (
        <Animated.View
          key={index}
          style={[styles.dot, {backgroundColor: value}]}
        />
      ))}
    </View>
  );
};

Loader.defaultProps = {
  size: 'small',
  dotsAmount: 4,
};
export default Loader;
