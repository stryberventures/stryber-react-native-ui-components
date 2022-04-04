import React from 'react';
import {View} from 'react-native';

import Slider from './components/Slider';

export default () => (
  <View
    style={{
      flex: 1,
      marginTop: 200,
      marginHorizontal: 20,
    }}>
    <Slider
      valueUp={3}
      limitUp={5}
      limitDown={0}
      step={1}
      onChange={() => {}}
    />
  </View>
);
