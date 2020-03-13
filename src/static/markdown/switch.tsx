export const switchDoc = `## Switch Usage

\`\`\`js
import {Switch} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Switch
    name="switch"
    value={values.switch}
    onPress={handleChange}
    text="Switch"
  />
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`value\`**  | Boolean, set switch checked or unchecked                                                          |
| **\`name\`**  | Set switch field name that will be returned in onPress function                                           |
| **\`onPress\`**  | A function that will be executed on tap event and get in params: onPress(value, name)                                            |
| **\`text\`**  |  Switch text                                             |
| **\`containerStyle\`**  | Style of switch container                                            |
| **\`circleStyle\`**  | Style of switch circle                                            |
| **\`circleColorOff\`**  | A circle color when switch is unchecked                                            |
| **\`circleColorOn\`**  | A circle color when switch is checked                                            |
| **\`duration\`**  | Switch animation duration. Default: 300                                            |
| **\`type\`**  | 0 - Normal switch, 1 - Switch with a text                                            |
| **\`style\`**  | Use to set Switch styles                                            |
| **\`backgroundColorOff\`**  | A background color when switch is unchecked                                            |
| **\`backgroundColorOn\`**  | A background color when switch is checked                                                                                 |
`;
