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
| **\`secure\`**  | Set input prop secureTextEntry to "true" and add toggle button                                         |
| **\`required\`**  | Add * to input label                                                                                    |
| **\`disabled\`**  | Disable input field. Set editable to false                                                           |
| **\`iconBackground\`**  | Add background to icon if you set icon to input                                                          |

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`type\`**  | used for defining input keyboardType, can be 'email' | 'phone' | 'number' | 'default'                                                           |
| **\`value\`**  | Set input value                                                          |
| **\`name\`**  | Set input field name that will be returned in onChange function argument                                                          |
| **\`onChange\`**  | A function that will be executed on value change event and get in params: onChange(value, name)                                           |
| **\`placeholder\`**  | Add placeholder to input.                                                             |
| **\`label\`**  | Add label to input.                                                             |
| **\`error\`**  | Set input error                                                         |
| **\`onFocus\`**  | A function that will be executed on input focus                                            |
| **\`onBlur\`**  | A function that will be executed on input blur                                                                                |
| **\`icon\`**  | A function that should return icon or some button component                                                           |
| **\`rightIcon\`**  | A function that should return icon or some button component                                                           |
| **\`mask\`**  | Add mask to input. Example: "XX/XX"                                                           |
| **\`style\`**  | Use to set input styles                                                          |
| **\`multiline\`** | Makes multiline input |
| **\`maxLength\`** | Max string length |
| **\`numberOfLines\`** | Min number of lines in multiline mode |
| **\`maxNumberOfLines\`** | Number of lines in multiline mode before showing scrollbars |
| **\`classes\`** | Object with styling classes that can override |
`;
