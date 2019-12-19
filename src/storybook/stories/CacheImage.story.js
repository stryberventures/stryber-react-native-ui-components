import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../components/CenterView';
import CacheImage from '../../components/CacheImage';

storiesOf('CacheImage', module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add('default', () => {
    return (
      <CacheImage
        source={{
          uri: 'https://i.imgur.com/CRznzmd.jpg',
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />
    );
  });
