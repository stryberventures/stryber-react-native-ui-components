import React, {useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {ThemeContext} from '../../core/themeProvider';
import {THEME_KEY, defaultTheme} from '../../constants';

export default function withTheme(Component) {
  return props => {
    const {
      themes = [defaultTheme],
      themeID = 'Default',
      setThemeID = () => {},
    } = useContext(ThemeContext) || {};

    const getTheme = themeID => themes.find(theme => theme.key === themeID);
    const setTheme = themeID => {
      AsyncStorage.setItem(THEME_KEY, themeID);
      setThemeID(themeID);
    };

    return (
      <Component
        {...props}
        themes={themes}
        theme={getTheme(themeID)}
        setTheme={setTheme}
      />
    );
  };
}
