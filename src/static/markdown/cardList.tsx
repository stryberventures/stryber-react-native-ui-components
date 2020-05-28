export const cardList = `## Slider Usage

\`\`\`js
import {CardList} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <CardList
    valueUp={10}
    valueDown={1}
  />
);
\`\`\`

## Properties

| Prop                    | Description                                         | Default value      |
| ----------------------------------------------------------------------------- | -------------------|
| **\`valueUp\`**         | initial up value                                    | 1                  |
| **\`valueDown\`**       | initial down value                                  | 0                  |
| **\`limitUp\`**         | maximum value                                       | 9                  |
| **\`limitDown\`**       | minimum value                                       | 0                  | 
| **\`step\`**            | with which step change value, by default 1          | 1                  |                                                                                                                                                                       
| **\`layout\`**          | defines labels position 'regular' or 'labelBottom'  | 'regular'          |
| **\`size\`**            | can be 'regular' or 'large'                         | 'regular'          |
| **\`color\`**           | color or the bar and pulsar                         | primary in theme   |
| **\`leftLabel\`**       | custom left label render handler, receives current valueDown as a parameter  | _        |  
| **\`rightLabel\`**      | custom right label render handler, receives current valueUp as a parameter   | _        | 
| **\`onChange\`**        | on value change handler, receives valueUp, valueDown as parameters           | _        |


| Prop (boolean)          | Description                                         | Default value                                                                                      |
| ------------------------------------------------------------------------------------------------|
| **\`smooth\`**          | how buttons should move, with step or smooth        | true            |
| **\`showDownButton\`**  | show up down value button                           | false           |
| **\`showTooltip\`**     | disables tooltip above the button                   | true            |
`;
