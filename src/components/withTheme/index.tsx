import React, {useContext, forwardRef, ComponentClass} from 'react';
import {storage} from '../other/core';
import {ThemeContext} from '../ThemeContextProvider';
import {THEME_KEY, defaultTheme} from '../other/constants';
const withTheme = <ComposedComponentProps extends {}>(
  Component:
    | React.FC<ComposedComponentProps>
    | ComponentClass<ComposedComponentProps>,
) => {
  type WrapperComponentProps = ComposedComponentProps & {
    themes?: any[];
    theme?: any;
    setTheme?: Function;
  };

  return forwardRef<React.ReactNode, WrapperComponentProps>((props, ref) => {
    const {
      themes = [defaultTheme],
      themeID = 'Default',
      setThemeID = () => {},
    } = useContext(ThemeContext) || {};
    /* eslint-disable no-shadow */
    const getTheme = (themeID: string) =>
      themes.find(theme => theme.key === themeID);
    const setTheme = (themeID: string) => {
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
};
export default withTheme;
