import React from 'react';

import {ScrollTabViewExample, TabViewExample} from '../preview/TabViewPreview';

import {storiesOf} from '@storybook/react-native';

storiesOf('TabView', module)
  .add('default', () => <TabViewExample />)
  .add('with scroll', () => <ScrollTabViewExample />);
