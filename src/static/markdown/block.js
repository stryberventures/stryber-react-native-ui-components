export const block = `## Block Usage

\`\`\`js
import {Block, Text} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Block padding={[10,5,10,5]} card><Text>Lorem ipsum</Text></Block>
);
\`\`\`

## Properties

| Prop (booleans)                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`flex\`**                                          | Similar to Stylesheets \`flex\` (Could be 0 or 1)                                                            |
| **\`row\`**  | Change flexDirection to row                                            |
| **\`column\`** | Change flexDirection to column                                              |
| **\`center\`**  | Change alignItems to center                                            |
| **\`middle\`**      | Change justifyContent to center |
| **\`left\`**      | Change justifyContent to flex-start |
| **\`right\`**      | Change justifyContent to flex-end |
| **\`top\`**      | Change justifyContent to flex-start |
| **\`card\`**      | Add borderRadius |
| **\`shadow\`**      | Add shadow |
| **\`animated\`**      | Add ability to use block as animated component(Animated.View) |
| **\`wrap\`**      | Change flexWrap to wrap |

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`padding\`**      | Add padding to component(could be number or arr of numbers) |
| **\`margin\`**      | Add margin to component(could be number or arr of numbers) |
| **\`style\`**      | Styles of Block component |
| **\`onPress\`**      | A function that executes on press  |
`;
