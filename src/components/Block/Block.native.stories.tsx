import * as React from 'react';
import Block from './index';
import CenterView from '../../storybook/CenterView';
import {block} from '../../static/markdown';
import {storiesOf} from '@storybook/react-native';

storiesOf('Block', module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add(
    'default',
    () => (
      <Block flex={0} style={{width: 200, height: 200}} color="#ccc" card />
    ),
    {notes: {markdown: block}},
  );
