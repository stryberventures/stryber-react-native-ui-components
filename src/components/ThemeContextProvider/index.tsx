import React, {useState, useEffect} from 'react';
import {merge, cloneDeep} from 'lodash-es';
import {storage} from '../other/core';
import {THEME_KEY, defaultTheme} from '../other/constants';
export const ThemeContext = React.createContext();
type ThemeContextProviderProps = {
  themes?: any[];
};
const ThemeContextProvider: React.SFC<ThemeContextProviderProps> = ({
  children,
  themes,
}) => {
  const [themeID, setThemeID] = useState();
  const fullThemes = themes.map(theme => {
    const themeBuffer = cloneDeep(defaultTheme);
    return merge(themeBuffer, theme);
  });
  useEffect(() => {
    (async () => {
      const storedThemeID = await storage.loadString(THEME_KEY);
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
export default ThemeContextProvider;
