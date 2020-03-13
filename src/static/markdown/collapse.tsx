export const collapse = `## Collapsible Usage

\`\`\`js
import {Collapse} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Collapse collapsed={isCollapsed}>
    <SomeCollapsedView />
  </Collapse>
)
\`\`\`

## Properties

| Prop                      | Description                                                                                                                                                                                                                                                                                                             | Default        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **\`align\`**               | Alignment of the content when transitioning, can be \`top\`, \`center\` or \`bottom\`                                                                                                                                                                                                                                         | \`top\`          |
| **\`collapsed\`**           | Whether to show the child components or not                                                                                                                                                                                                                                                                             | \`true\`         |
| **\`collapsedHeight\`**     | Which height should the component collapse to                                                                                                                                                                                                                                                                           | \`0\`            |
| **\`enablePointerEvents\`** | Enable pointer events on collapsed view                                                                                                                                                                                                                                                                                 | \`false\`        |
| **\`duration\`**            | Duration of transition in milliseconds                                                                                                                                                                                                                                                                                  | \`300\`          |
| **\`easing\`**              | Function or function name from [\`Easing\`](https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/Easing.js) (or [\`tween-functions\`](https://github.com/chenglou/tween-functions) if < RN 0.8). Collapsible will try to combine \`Easing\` functions for you if you name them like \`tween-functions\`. | \`easeOutCubic\` |
| **\`style\`**               | Optional styling for the container                                                                                                                                                                                                                                                                                      |                |
| **\`onAnimationEnd\`**      | Callback when the toggle animation is done. Useful to avoid heavy layouting work during the animation                                                                                                                                                                                                                   | \`() => {}\`     |

## Example

\`\`\`js
import React from 'react';
import {View} from 'react-native';

import {
  Collapse,
  Block,
  Text,
} from '@stryberventures/stryber-react-native-ui-components';

const CollapsePreview = () => {
  const [collapse, toggleCollapse] = React.useState(true);

  return (
    <View style={{height: 100}}>
      <Block flex={0} onPress={() => toggleCollapse(!collapse)}>
        <Text>Toggle content</Text>
      </Block>
      <Collapse
        duration={700}
        align="bottom"
        onAnimationEnd={() => console.log('End')}
        collapsed={collapse}>
        <Text>Main Content</Text>
      </Collapse>
    </View>
  );
};
\`\`\``;
