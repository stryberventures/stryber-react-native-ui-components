export const buttonCounter = `## ButtonCounter Usage

\`\`\`js
import {ButtonCounter, Text} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <ButtonCounter color="primary" onPress={console.log('clicked')}>
  </ButtonCounter>
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`ononCountChange\`**  | Function that will be executed when user changes count value by tapping on buttons   
| **\`color\`** | Button background color. Default colors - colors from matterhorn styleguide            |
| **\`shape\`** | String, set shape of button corners. One of: rectangle, rounded, round           |
| **\`icon\`** | String, add icon inside button. One of: ArrowDown, Calendar, Check, Eye, EyeDisabled, Search, UserIcon           |
| **\`iconProps\`** | Object, add properties to the button icon.                                          |
| **\`style\`**  | An object with button styles 
| **\`shadow\`**      | Boolean, add shadow to button |
| **\`small\`**      | Boolean, adds styles of small button |
| **\`mini\`**      | Boolean, adds styles of mini button |
`;
