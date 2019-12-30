export const button = `## Button Usage

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
| **\`color\`** | Button background color. Default colors: accent, primary, secondary, tertiary, black, white, gray, gray2, darkGray                                            |
| **\`border\`** | Set border to button. Could be boolean(primary color by default) of color string                                             |
| **\`style\`**  | An object with button styles                                            |
| **\`gradient\`**      | Boolean, add gradient to button |
| **\`shadow\`**      | Boolean, add shadow to button |
| **\`ripple\`**      | Boolean, add ripple effect to button |
| **\`start\`**      | Object, that specify start position for gradient colors. Example: {x: 0, y: 0} |
| **\`end\`**      | Object, that specify end position for gradient colors. Example: {x: 0, y: 0} |
| **\`startColor\`**      | Gradient first color |
| **\`endColor\`**      | Gradient second color |
| **\`rippleColor\`**      | Ripple color |
| **\`rippleCentered\`**      | Boolean that specify ripple effect to center |
| **\`rippleOpacity\`**      | Specify ripple opacity. Default: 0.54 |
| **\`rippleDuration\`**      | Specify ripple duration. Default: 400 |
`;
