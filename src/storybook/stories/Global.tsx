import * as React from 'react';
import {addDecorator, addParameters} from '@storybook/react-native';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import ThemeContextProvider from '../../components/ThemeContextProvider';
import {themes} from '../../constants/allThemes';
import {ThemeProvider} from '../../components';

const projTheme = {colors: {primary: 'black'}};

addDecorator(withBackgrounds);
addDecorator((getStory: React.ReactNode) => (
  <ThemeContextProvider themes={themes}>
    <ThemeProvider initial={projTheme}>{getStory()}</ThemeProvider>
  </ThemeContextProvider>
));
addParameters({
  backgrounds: [
    {name: 'light', value: '#eeeeee'},
    {name: 'dark', value: '#222222'},
    {name: 'black', value: '#000000'},
    {name: 'white', value: '#ffffff', default: true},
  ],
});
