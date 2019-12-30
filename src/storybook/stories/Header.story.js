import React from 'react';
import {SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {storiesOf} from '@storybook/react-native';
import Header from '../../components/Header';
import AnimatedHeader from '../../components/AnimatedHeader';
import {header} from '../../static/markdown/header';

storiesOf('Header', module)
  .addParameters({
    notes: {markdown: header},
  })
  .addDecorator(getStory => <SafeAreaView>{getStory()}</SafeAreaView>)
  .add('default', () => {
    return <Header text="Test" />;
  })
  .add('with icons', () => {
    return (
      <Header
        text="Test"
        leftIcon={() => (
          <Icon
            style={{
              height: 24,
              width: 44,
              position: 'absolute',
              left: 10,
              fontSize: 24,
            }}
            color="#fff"
            name="ios-arrow-back"
            onPress={() => {}}
          />
        )}
        rightIcon={() => (
          <Icon
            style={{
              height: 24,
              width: 44,
              position: 'absolute',
              right: 10,
              fontSize: 24,
              textAlign: 'right',
            }}
            color="#fff"
            name="ios-search"
            onPress={() => {}}
          />
        )}
      />
    );
  })
  .add('animated', () => {
    return <AnimatedHeader />;
  });
