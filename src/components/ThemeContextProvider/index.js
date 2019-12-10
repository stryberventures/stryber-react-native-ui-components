import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {merge, cloneDeep} from 'lodash-es';
import PropTypes from 'prop-types';

import {THEME_KEY, defaultTheme} from '../../constants';

// Quieting AsyncStorage warnings!
// Per https://github.com/storybookjs/storybook/issues/6078#issuecomment-510167432
const ReactNative = require('react-native');
Object.defineProperty(ReactNative, 'AsyncStorage', {
  get(): any {
    return require('react-native').default;
  },
});

/**
 * Export AsyncStorage so it's usable elsewhere.
 */
export const Storage = AsyncStorage;

export const ThemeContext = React.createContext();

const ThemeContextProvider = ({children, themes}) => {
  const [themeID, setThemeID] = useState();

  const fullThemes = themes.map(theme => {
    const themeBuffer = cloneDeep(defaultTheme);
    return merge(themeBuffer, theme);
  });
  useEffect(() => {
    (async () => {
      const storedThemeID = await Storage.getItem(THEME_KEY);
      if (fullThemes.some(({key}) => key === storedThemeID)) {
        setThemeID(storedThemeID);
      } else {
        setThemeID(fullThemes[0].key);
      }
    })();
  });

  return (
    <ThemeContext.Provider value={{themes: fullThemes, themeID, setThemeID}}>
      {themeID ? children : null}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.defaultProps = {
  themes: [defaultTheme],
};

ThemeContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  themes: PropTypes.array,
};

export default ThemeContextProvider;
