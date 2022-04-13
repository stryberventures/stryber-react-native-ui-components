import React, {useCallback, useContext, useMemo, useState} from 'react';
import {merge} from 'lodash-es';

import {defaultTheme} from '../../constants';

declare global {
  namespace DesignSystem {
    interface IProjectTheme {}
  }
}

// eslint-disable-next-line no-undef
export type ThemeType = typeof defaultTheme & DesignSystem.IProjectTheme;

interface IThemeContext {
  theme: ThemeType;
  updateTheme: (updatedTheme: Object) => void;
}

interface IThemeProvider {
  initial: Object;
  children?: React.ReactNode;
}

const Context = React.createContext<IThemeContext>({
  theme: defaultTheme,
  // eslint-disable-next-line no-console
  updateTheme: () => console.log('ThemeProvider is not rendered yet'),
});

export const ThemeProvider = React.memo<IThemeProvider>(
  ({initial, children}) => {
    const [theme, setTheme] = useState(merge({}, defaultTheme, initial));

    const UpdateThemeCallback = useCallback(<T,>(updatedTheme: T) => {
      setTheme(currentTheme => merge({}, currentTheme, updatedTheme));
    }, []);

    const MemoizedValue = useMemo(() => {
      const value: IThemeContext = {
        theme,
        updateTheme: UpdateThemeCallback,
      };
      return value;
    }, [theme, UpdateThemeCallback]);

    return (
      <Context.Provider value={MemoizedValue}>{children}</Context.Provider>
    );
  },
);

export const useTheme = () => useContext(Context);
