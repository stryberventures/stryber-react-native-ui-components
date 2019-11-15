import React from 'react';
import {Card} from '../components';
import CenterView from '../components/CenterView';

import {storiesOf} from '@storybook/react-native';
import {linkTo} from '@storybook/addon-links';

storiesOf('Card', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <Card />);
