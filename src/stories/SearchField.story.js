import React from 'react';

import {SearchField} from '../components';
import CenterView from '../components/CenterView';

import {storiesOf} from '@storybook/react-native';
import {withKnobs, color} from '@storybook/addon-knobs';
import {defaultTheme} from '../constants';

storiesOf('SearchField', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    // const badgeBackground = color(
    //   'Badge Background Color',
    //   defaultTheme.colors.accent,
    //   'Badge',
    // );
    return <SearchField placeholder="Search field" />;
  });
