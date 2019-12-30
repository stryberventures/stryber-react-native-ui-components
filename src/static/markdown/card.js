export const card = `## Card Usage

\`\`\`js
import {Card, Block, Text} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Card
      gradientColors={['transparent', '#000']}
      backgroundImage={require('../../static/images/mountain.jpeg')}>
      <Block
        padding={10}
        style={{justifyContent: 'flex-end'}}>
        <Text white bold size={25}>
          Card Example
        </Text>
        <Text style={{marginVertical: 7}} white bold size={20}>
          € 50/Month
        </Text>
        <Text white style={{marginBottom: 10}} size={18}>
          Subscriptions will automatically renew and your credit card will be
          charged at the end
        </Text>
        <Button border="white" color="transparent">
          <Text size={22} white header center bold>
            Button text
          </Text>
        </Button>
      </Block>
  </Card>
);
\`\`\`

## Properties

| Prop                                                   | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`card\`**  | Boolean add borderRadius to component                                                           |
| **\`shadow\`**  |  Boolean add shadow to component                                            |
| **\`style\`**  | An object with component  styles                                            |
| **\`backgroundImage\`**  | Set image as a card background                                            |
| **\`resizeMode\`**  | Background image resize mode                                            |
| **\`gradientStyle\`**  | Add yor styles to gradient(LinearGradient component)                                            |
| **\`gradientColors\`**  | An array with gradient colors. Example: ['transparent', '#000']                                            |`;
