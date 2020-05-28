export const checkbox = `## Checkbox Usage

\`\`\`js
import {Checkbox} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Checkbox
    name="checkbox"
    value={values.checkbox}
    onPress={handleChange}
    text="Default checkbox"
  />
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`radio\`**  | Boolean, change checkbox to radio button. By default false                                             |
| **\`value\`**  | Boolean, set checkbox checked or unchecked                                                          |
| **\`text\`**  |  Checkbox text                                             |
| **\`textColor\`**  | Color of checkbox text                                            |
| **\`name\`**  | Set checkbox field name that will be returned in onPress function                                           |
| **\`onPress\`**  | A function that will be executed on tap event and get in params: onPress(value, name)                                            |
| **\`opacity\`**  | Specify opacity on tap from 0 to 1. Default: 0.8                                            |
| **\`bgColor\`**  | Defines custom background color                                            |
`;
