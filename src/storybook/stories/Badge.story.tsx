import * as React from 'react';
import Badge from '../../components/Badge';
import CenterView from '../../components/CenterView';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, color} from '@storybook/addon-knobs';
import {defaultTheme} from '../../components/other/constants';
import {badge} from '../../static/markdown';
storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .addParameters({
    notes: {markdown: badge},
  })
  .add('default', () => {
    const badgeBackground = color(
      'Badge Background Color',
      defaultTheme.colors.accent,
      'Badge',
    );
    return <Badge color={badgeBackground} />;
  })
  .add('with number', () => <Badge value={5} />);
