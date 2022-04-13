import * as React from 'react';
import * as Icons from './index';
import Text from '../Text';
import CenterView from '../../storybook/CenterView';
import {storiesOf} from '@storybook/react-native';

storiesOf('Icons', module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add('default', () => (
    <>
      <Text>Default Icons Pack:</Text>
      <Icons.ArrowDown />
      <Icons.Calendar />
      <Icons.Check />
      <Icons.Close />
      <Icons.Eye />
      <Icons.EyeDisabled />
      <Icons.Minus />
      <Icons.Plus />
      <Icons.Search />
      <Icons.Speaker />
      <Icons.SpeakerMute />
      <Icons.UserIcon />
    </>
  ));
