import * as React from 'react';
import {Image} from 'react-native';
import {Card, Block, Text, Button} from '../../components';
import CenterView from '../../components/CenterView';
import {withKnobs, color} from '@storybook/addon-knobs';
import {defaultTheme as theme} from '../../components/other/constants';
import {storiesOf} from '@storybook/react-native';
import {card} from '../../static/markdown';
storiesOf('Card', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addParameters({
    notes: {markdown: card},
  })
  .add('simple card', () => (
    <Card shadow>
      <Block padding={theme.sizes.cardPadding} style={{flex: 0}}>
        <Text bold size={theme.sizes.h2}>
          Card Example
        </Text>
        <Text style={{marginBottom: 10}} size={theme.sizes.caption}>
          Active
        </Text>
        <Button type="outlined">Button text</Button>
      </Block>
    </Card>
  ))
  .add('card with second type of shadow', () => (
    <Card shadow shadowType="large">
      <Block padding={theme.sizes.cardPadding} style={{flex: 0}}>
        <Text bold size={theme.sizes.h2}>
          Card Example
        </Text>
        <Text style={{marginBottom: 10}} size={theme.sizes.caption}>
          Active
        </Text>
        <Button type="outlined">Button text</Button>
      </Block>
    </Card>
  ))
  .add('with background', () => (
    <Card background="primary">
      <Block padding={theme.sizes.cardPadding} style={{flex: 0}}>
        <Text bold white size={theme.sizes.h2}>
          Card Example
        </Text>
        <Text white style={{marginBottom: 10}} size={theme.sizes.caption}>
          Active
        </Text>
        <Button type="outlined">Button text</Button>
      </Block>
    </Card>
  ))
  .add('top image', () => (
    <Card shadow>
      <Image
        source={require('../../static/images/mountain.jpeg')}
        style={{height: 145}}
        resizeMode="cover"
      />
      <Block padding={theme.sizes.cardPadding} style={{flex: 0}}>
        <Text bold size={theme.sizes.h2}>
          Card Example
        </Text>
        <Text primary style={{marginVertical: 7}} bold size={theme.sizes.title}>
          € 50/Month
        </Text>
        <Text style={{marginBottom: 10}} size={theme.sizes.caption}>
          Subscriptions will automatically renew and your credit card will be
          charged at the end
        </Text>
        <Button type="outlined">Button text</Button>
      </Block>
    </Card>
  ))
  .add('with background image', () => {
    const gradientColor = color('Gradient Color', '#000', 'BackgroundGradient');
    return (
      <Card
        gradientColors={['transparent', gradientColor]}
        backgroundImage={require('../../static/images/mountain.jpeg')}>
        <Block
          padding={theme.sizes.cardPadding}
          style={{justifyContent: 'flex-end'}}>
          <Text white bold size={theme.sizes.h2}>
            Card Example
          </Text>
          <Text style={{marginVertical: 7}} white bold size={theme.sizes.title}>
            € 50/Month
          </Text>
          <Text white style={{marginBottom: 10}} size={theme.sizes.caption}>
            Subscriptions will automatically renew and your credit card will be
            charged at the end
          </Text>
          <Button type="outlined">Button text</Button>
        </Block>
      </Card>
    );
  });
