export const slider = `## Slider Usage

\`\`\`js
import {Slider} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Slider
    valueUp={10}
    smooth
    step={1}
  />
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`valueUp\`**  | initial up value                                           |
| **\`valueDown\`**  | initial down value                                     |
| **\`limitUp\`**  | maximum value                                   |
| **\`limitDown\`**  | minimum value                                  | 
| **\`step\`**  | with which step change value, by default 1                                  |
| **\`smooth\`**  | how buttons should move, with step or smooth                                 | 
| **\`size\`**  | can be 'regular' or 'large'                                  |
| **\`color\`**  | color or the bar and pulsar                                  | 
| **\`layout\`**  | defines labels position 'regular' or 'labelBottom'                                 |
| **\`downButtonVisible\`**  | defines posibility to change low value                        |           
| **\`leftLabel\`**  | renders custom left label                                 |  
| **\`rightLabel\`**  | renders custom right label                                 | 
| **\`onChange\`**  | on value change handler                               |
`;
