export const dropdown = `## Dropdown Usage

\`\`\`js
import {Dropdown} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Dropdown
    name="picker"
    data={[
              {
                value: 'Banana',
              },
              {
                value: 'Mango',
              },
              {
                value: 'Pear',
              },
     ]}
    label="Pick fast"
    value={values.picker}
    onChange={handleChange}
  />
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`value\`**  | Set as start value(one of data array value)                                                          |
| **\`name\`**  | Set Dropdown field name that will be returned in onChange function                                           |
| **\`onChange\`**  | A function that will be executed on change value and get in params: onChange(value, name)                                            |
| **\`disabled\`**  | Disable Dropdown component                                         |
| **\`data\`**  | Array of dropdown values. Example: [{value: 'Banana'}]                                                                                    |
| **\`style\`**  | Use to set Dropdown styles                                            |
| **\`error\`**  | Set error to Dropdown                                                                                 |
| **\`fontSize\`**  | Change element font size                                                                                 |
| **\`textColor\`**  | Change selected element text color                                                                                 |
| **\`itemColor\`**  | Change non selected element color                                                                                 |
`;
