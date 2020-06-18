export const tags = `## Tags Usage

\`\`\`js
import {Tags} from '@stryberventures/stryber-react-native-ui-components';
const tagsArr = [{ id: 1, label: 'Yuliia' }, { id: 2, label: 'Anton' }];
() => (
  <Tags tags={tagsArr} shape="rounded" size="small" withCross/>
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`tags\`**  | Array of objects with properties 'id' and 'label'                          |                                          |
| **\`color\`** | Tag color. Default colors - colors from matterhorn styleguide            |
| **\`shape\`** | String, set shape of tag corners. One of: rectangle, rounded, round           | 
| **\`size\`** | String, set size of tag corners. One of: large, small           | 
| **\`withCross\`** | Boolean, set close button (Cross Icon) next to the tagged item       | 
| **\`style\`**  | An object with tag styles`;
