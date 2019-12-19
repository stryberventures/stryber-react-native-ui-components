import React from 'react';

import Badge from '../../components/Badge';
import CenterView from '../../components/CenterView';

import {storiesOf} from '@storybook/react-native';
import {withKnobs, color} from '@storybook/addon-knobs';
import {defaultTheme} from '../../constants';

storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add('default', () => {
    const badgeBackground = color(
      'Badge Background Color',
      defaultTheme.colors.accent,
      'Badge',
    );
    return <Badge color={badgeBackground} />;
  })
  .add('with number', () => <Badge value={999} />);
