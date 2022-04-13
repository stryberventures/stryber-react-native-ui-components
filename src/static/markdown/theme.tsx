export const theme = `## Theme Usage

\`\`\`js
import {ThemeProvider} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <ThemeProvider initial={initThemeObject}>
    <AppRootComponent />
  </ThemeProvider>
);
\`\`\`

## Description

To use theme wrap your root component with \`ThemeProvider\`. In \`ThemeProvider\`
set \`initial\` prop. This prop is getting theme object(first theme will be default). In theme object you can set
few props others will be merged from default.
To use \`theme\` in child component use \`useTheme()\` hook. See example below:

## Example of \`useTheme()\` usage

\`\`\`js
import * as React from "react";
import {useTheme, Text} from '@stryberventures/stryber-react-native-ui-components';

const ChildComponent = (props) => {
const {theme} = useTheme();

return <Text size={theme.sizes.h1}>Lorem ipsum</Text>;
}

export default ChildComponent;
\`\`\`

## Types Declaration

You can declare types of your project theme and extend ThemeType by declaring global types:

\`\`\`ts

const projectTheme = {
  components: {
    safeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: '#fff',
    },
  }
}

type ProjectThemeType = typeof projectTheme

declare global {
  namespace DesignSystem {
    interface IProjectTheme extends ProjectThemeType {}
  }
}

\`\`\`
`;
