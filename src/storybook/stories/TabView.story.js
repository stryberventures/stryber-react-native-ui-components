import React from 'react';

import {
  ScrollTabViewExample,
  TabViewExample,
  TabViewBottomIconExample,
} from '../preview/TabViewPreview';

import {storiesOf} from '@storybook/react-native';

storiesOf('TabView', module)
  .add('default', () => <TabViewExample />)
  .add('with scroll', () => <ScrollTabViewExample />)
  .add('with icons at bottom', () => <TabViewBottomIconExample />);
