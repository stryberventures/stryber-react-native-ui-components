export const datePicker = `## DatePicker Usage

\`\`\`js
import {DatePicker} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <DatePicker
    name="date"
    label="Choose date"
    value={values.date}
    onChange={handleChange}
  />
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`value\`**  | Date object, could be set as start date                                                          |
| **\`name\`**  | Set DatePicker field name that will be returned in onChange function                                           |
| **\`onChange\`**  | A function that will be executed on change date and get in params: onChange(value, name)                                            |
| **\`minDate\`**  |  Date object, set minimal date                                           |
| **\`maxDate\`**  | Date object, set maximal date                                           |
| **\`modalButtonText\`**  | Set text to close button of iOS modal                                             |
| **\`modalOverlayStyle\`**  | Set styles to iOS modal overlay                                           |
| **\`modalStyle\`**  | Set styles to iOS modal                                            |
| **\`modalButtonStyle\`**  | Set styles to iOS modal button                                             |
| **\`modalBtnContainer\`**  | Set styles to iOS modal button container                                            |
| **\`style\`**  | Use to set DatePicker styles                                            |
| **\`label\`**  | Set label to DatePicker                                           |
| **\`error\`**  | Set error to DatePicker                                                                                 |
`;
