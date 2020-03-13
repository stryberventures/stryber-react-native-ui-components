import * as React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import Block from '../Block';
const HEADER_HEIGHT = 70;
const AnimatedHeader = () => {
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });
  return (
    <View>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: 'grey',
          transform: [{translateY: headerY}],
          zIndex: 1,
        }}
      />
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        style={{
          paddingTop: HEADER_HEIGHT,
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {y: scrollY}},
          },
        ])}>
        <Block
          style={{backgroundColor: 'blue', height: 500}}
          card
          margin={20}
        />
        <Block
          style={{backgroundColor: 'grey', height: 500}}
          card
          margin={20}
        />
        <Block
          style={{backgroundColor: 'grey', height: 500}}
          card
          margin={20}
        />
      </Animated.ScrollView>
    </View>
  );
};
export default AnimatedHeader;
