import React, {useState, useEffect} from 'react';
// @ts-ignore
import {merge, cloneDeep} from 'lodash-es';
import {storage} from '../other/core';
import {THEME_KEY, defaultTheme} from '../other/constants';

// @ts-ignore
export const ThemeContext = React.createContext();

type ThemeContextProviderProps = {
  themes?: any[];
};

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
  themes,
}) => {
  const [themeID, setThemeID] = useState();
  const fullThemes = themes!.map(theme => {
    const themeBuffer = cloneDeep(defaultTheme);
    return merge(themeBuffer, theme);
  });
  useEffect(() => {
    (async () => {
      const storedThemeID = await storage.loadString(THEME_KEY);
      if (fullThemes.some(({key}) => key === storedThemeID)) {
        // @ts-ignore
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
