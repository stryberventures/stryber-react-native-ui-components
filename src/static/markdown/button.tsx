export const button = `
## Button Usage

\`\`\`js
import {Button, Text} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Button color="primary" onPress={console.log('clicked')}>
    <Text header white center bold>
      Button text
    </Text>
  </Button>
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`onPress\`**  | Function that will be executed when user tap on button component                                                           |
| **\`opacity\`**  | On press opacity                                            |
| **\`color\`** | Button background color. Default colors - colors from matterhorn styleguide            |
| **\`shape\`** | String, set shape of button corners. One of: rectangle, rounded, round           |
| **\`icon\`** | String, add icon inside button. One of: ArrowDown, Calendar, Check, Eye, EyeDisabled, Search, UserIcon           |
| **\`iconProps\`** | Object, add properties to the button icon.           |
| **\`border\`** | Set border to button. Could be boolean(primary color by default) of color string                                             |
| **\`style\`**  | An object with button styles                                            |
| **\`shadow\`**      | Boolean, add shadow to button |
| **\`small\`**      | Boolean, adds styles of small button |
| **\`mini\`**      | Boolean, adds styles of mini button |
| **\`link\`**      | Boolean, adds styles of link button |
`;
