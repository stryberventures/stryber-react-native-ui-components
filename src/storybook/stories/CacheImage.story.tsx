import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import CenterView from '../CenterView';
import CacheImage from '../../components/CacheImage';
import {cacheImage} from '../../static/markdown';
storiesOf('CacheImage', module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .addParameters({
    notes: {markdown: cacheImage},
  })
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
