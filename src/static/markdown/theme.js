export const theme = `## Theme Usage

\`\`\`js
import {ThemeContextProvider} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <ThemeContextProvider themes={[theme1, theme2]}>
    <AppRootComponent />
  </ThemeContextProvider>
);
\`\`\`

## Description

To use theme wrap your root component with \`ThemeContextProvider\`. In \`ThemeContextProvider\`
set \`themes\` prop. This prop get array with different themes(first theme will be default). In theme you can set
few props others will be added from default.
To use \`theme\` in child component wrap this component with \`withTheme\`. See example below:

## Example of \`withTheme\` usage

\`\`\`js
import React from "react";
import {withTheme, Text} from '@stryberventures/stryber-react-native-ui-components';

const ChildComponent = (props) => {
const {theme} = props;

return <Text size={theme.sizes.h1}>Lorem ipsum</Text>;
}

export default withTheme(ChildComponent);
\`\`\`
`;
