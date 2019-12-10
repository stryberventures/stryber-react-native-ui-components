import React, {useContext, forwardRef} from 'react';

import {storage} from '../../core';
import {ThemeContext} from '../ThemeContextProvider';
import {THEME_KEY, defaultTheme} from '../../constants';

function withTheme(Component) {
  return forwardRef((props, ref) => {
    const {
      themes = [defaultTheme],
      themeID = 'Default',
      setThemeID = () => {},
    } = useContext(ThemeContext) || {};

    /* eslint-disable no-shadow */
    const getTheme = themeID => themes.find(theme => theme.key === themeID);
    const setTheme = themeID => {
      storage.saveString(THEME_KEY, themeID);
      setThemeID(themeID);
    };
    /* eslint-enable no-shadow */

    return (
      <Component
        {...props}
        themes={themes}
        theme={getTheme(themeID)}
        setTheme={setTheme}
        ref={ref}
      />
    );
  });
}

export default withTheme;
