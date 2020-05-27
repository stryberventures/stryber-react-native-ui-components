export const input = `## Input Usage

\`\`\`js
import {Input} from '@stryberventures/stryber-react-native-ui-components';


() => (
  <Input
    name="email"
    value={values.email}
    onChange={handleChange}
    placeholder="Email"
    label="Email"
  />
);
\`\`\`

## Properties

| Prop (boolean)                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`email\`**  | Set input prop keyboardType to "email-address"                                                           |
| **\`phone\`**  | Set input prop keyboardType to "phone-pad"                                           |
| **\`number\`**  | Set input prop keyboardType to "numeric"                                            |
| **\`secure\`**  | Set input prop secureTextEntry to "true" and add toggle button                                         |
| **\`required\`**  | Add * to input label                                                                                    |
| **\`disabled\`**  | Disable input field. Set editable to false                                                           |
| **\`iconBackground\`**  | Add background to icon if you set icon to input                                                          |

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`value\`**  | Set input value                                                          |
| **\`name\`**  | Set input field name that will be returned in onPress function argument                                                          |
| **\`onChange\`**  | A function that will be executed on value change event and get in params: onChange(value, name)                                           |
| **\`placeholder\`**  | Add placeholder to input. If you don't set label, label will be same as placeholder                                                             |
| **\`error\`**  | Set input error                                                         |
| **\`onFocus\`**  | A function that will be executed on input focus                                            |
| **\`onBlur\`**  | A function that will be executed on input blur                                                                                |
| **\`icon\`**  | A function that should return icon component                                                           |
| **\`mask\`**  | Add mask to input. Example: "XX/XX"                                                           |
| **\`style\`**  | Use to set input styles                                                          |
`;
