import React from 'react';
import {addDecorator, addParameters} from '@storybook/react-native';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import ThemeContextProvider from '../../components/ThemeContextProvider';
import {themes} from '../../constants/allThemes';

addDecorator(withBackgrounds);

addDecorator(getStory => (
  <ThemeContextProvider themes={themes}>{getStory()}</ThemeContextProvider>
));

addParameters({
  backgrounds: [
    {name: 'light', value: '#eeeeee'},
    {name: 'dark', value: '#222222'},
    {name: 'black', value: '#000000'},
    {name: 'white', value: '#ffffff', default: true},
  ],
});
