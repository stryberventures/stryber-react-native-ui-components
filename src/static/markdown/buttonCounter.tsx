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
| **\`onCountChange\`**  | Function that will be executed when user changes count value by tapping on buttons   
| **\`renderCount\`**  | Function that renders custom count 
| **\`color\`** | Button background color. Default colors - colors from matterhorn styleguide            |
| **\`shape\`** | String, set shape of button corners. One of: rectangle, rounded, round           |
| **\`size\`** | String, modifies button to one of views: regular, small, mini         |
| **\`iconProps\`** | Object, add properties to the button icon.                                          |
| **\`style\`**  | An object with button styles 
| **\`shadow\`**      | Boolean, add shadow to button |
| **\`value\`**      | Number, count number |
| **\`initialValue\`**      | Number, value on initialization |
| **\`minValue\`**      | Number min value |
| **\`maxValue\`**      | Number, max value |
`;
