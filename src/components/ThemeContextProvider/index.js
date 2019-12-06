import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {merge, cloneDeep} from 'lodash-es';
import PropTypes from 'prop-types';

import {THEME_KEY, defaultTheme} from '../../constants';

export const ThemeContext = React.createContext();

const ThemeContextProvider = ({children, themes}) => {
  const [themeID, setThemeID] = useState();

  const fullThemes = themes.map(theme => {
    const themeBuffer = cloneDeep(defaultTheme);
    return merge(themeBuffer, theme);
  });
  useEffect(() => {
    (async () => {
      const storedThemeID = await AsyncStorage.getItem(THEME_KEY);
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
