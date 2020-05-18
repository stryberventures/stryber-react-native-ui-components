import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {withKnobs, color, text, object, select} from '@storybook/addon-knobs';
import {defaultTheme} from '../../components/other/constants';
import {Button, Block, Text} from '../../components';
import CenterView from '../../components/CenterView';
import {button} from '../../static/markdown';
storiesOf('Button', module)
  .addParameters({
    notes: {markdown: button},
  })
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with gradient', () => {
    // for Button
    const gradientColor1 = color(
      'Gradient First Color',
      defaultTheme.colors.primary,
      'Gradient',
    );
    const gradientColor2 = color(
      'Gradient Second Color',
      defaultTheme.colors.secondary,
      'Gradient',
    );
    const colorPosition1 = object(
      "Change 1'st color position",
      {x: 0, y: 0},
      'Gradient',
    );
    const colorPosition2 = object(
      "Change 2'nd color position",
      {x: 1, y: 1},
      'Gradient',
    );
    // for Text
    const textColorsSelect = select(
      'Colors',
      {
        accent: 'accent',
        primary: 'primary',
        secondary: 'secondary',
        tertiary: 'tertiary',
        black: 'black',
        white: 'white',
        gray: 'gray',
        gray2: 'gray2',
      },
      'white',
      'Text',
    );
    const buttonText = text('Button text', 'Hello Button', 'Text');
    return (
      <Button
        startColor={gradientColor1}
        endColor={gradientColor2}
        start={colorPosition1}
        end={colorPosition2}
        gradient
        onPress={action('clicked-gradient')}>
        <Text bold {...{[textColorsSelect]: true}} center>
          {buttonText}
        </Text>
      </Button>
    );
  })
  .add('with shadow', () => (
    <Button shadow color="white" onPress={action('clicked-shadow')}>
      <Text center semibold>
        Button text
      </Text>
    </Button>
  ))
  .add('primary', () => (
    <>
      <Button color="primary" onPress={action('clicked-shadow')}>
        <Text white center bold>
          Button text
        </Text>
      </Button>
      <Button
        shape="rectangle"
        color="primary"
        onPress={action('clicked-shadow')}>
        <Text white center bold>
          Button text
        </Text>
      </Button>
      <Button shape="round" color="primary" onPress={action('clicked-shadow')}>
        <Text white center bold>
          Button text
        </Text>
      </Button>
    </>
  ))
  .add('primary with icon', () => (
    <>
      <Button
        color="primary"
        icon="Eye"
        iconProps={{style: {marginRight: 10}, fill: '#fff'}}
        onPress={action('clicked-shadow')}>
        <Text white center bold>
          Button text
        </Text>
      </Button>
      <Button
        shape="rectangle"
        icon="Eye"
        iconProps={{style: {marginRight: 10}, fill: '#fff'}}
        color="primary"
        onPress={action('clicked-shadow')}>
        <Text white center bold>
          Button text
        </Text>
      </Button>
      <Button
        shape="round"
        color="primary"
        icon="Eye"
        iconProps={{style: {marginRight: 10}, fill: '#fff'}}
        onPress={action('clicked-shadow')}>
        <Text white center bold>
          Button text
        </Text>
      </Button>
    </>
  ))
  .add('secondary', () => (
    <>
      <Button border color="transparent" onPress={action('clicked-shadow')}>
        <Text primary center bold>
          Button text
        </Text>
      </Button>
      <Button
        shape="rectangle"
        border
        color="transparent"
        onPress={action('clicked-shadow')}>
        <Text primary center bold>
          Button text
        </Text>
      </Button>
      <Button
        shape="round"
        border
        color="transparent"
        onPress={action('clicked-shadow')}>
        <Text primary center bold>
          Button text
        </Text>
      </Button>
    </>
  ))
  .add('secondary with icon', () => (
    <>
      <Button
        border
        color="transparent"
        icon="Eye"
        iconProps={{style: {marginRight: 10}}}
        onPress={action('clicked-shadow')}>
        <Text primary center bold>
          Button text
        </Text>
      </Button>
      <Button
        shape="rectangle"
        border
        color="transparent"
        icon="Eye"
        iconProps={{style: {marginRight: 10}}}
        onPress={action('clicked-shadow')}>
        <Text primary center bold>
          Button text
        </Text>
      </Button>
      <Button
        shape="round"
        border
        color="transparent"
        icon="Eye"
        iconProps={{style: {marginRight: 10}}}
        onPress={action('clicked-shadow')}>
        <Text primary center bold>
          Button text
        </Text>
      </Button>
    </>
  ))
  .add('with ripple', () => (
    <Button
      ripple
      border
      color="transparent"
      onPress={action('clicked-shadow')}>
      <Text primary center bold>
        Button text
      </Text>
    </Button>
  ))
  .add('mini button', () => (
    <>
      <Block
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Button border color="primary" onPress={action('clicked-mini1')} mini>
          <Text white caption center>
            Label
          </Text>
        </Button>
        <Button
          border
          color="transparent"
          onPress={action('clicked-mini2')}
          mini>
          <Text primary caption center>
            Label
          </Text>
        </Button>
        <Button
          border="#95acbf"
          color="transparent"
          onPress={action('clicked-mini3')}
          mini>
          <Text color="#95acbf" caption center>
            Label
          </Text>
        </Button>
      </Block>
      <Block
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Button
          shape="rectangle"
          border
          color="primary"
          onPress={action('clicked-mini1')}
          mini>
          <Text white caption center>
            Label
          </Text>
        </Button>
        <Button
          shape="rectangle"
          border
          color="transparent"
          onPress={action('clicked-mini2')}
          mini>
          <Text primary caption center>
            Label
          </Text>
        </Button>
        <Button
          shape="rectangle"
          border="#95acbf"
          color="transparent"
          onPress={action('clicked-mini3')}
          mini>
          <Text color="#95acbf" caption center>
            Label
          </Text>
        </Button>
      </Block>
      <Block
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Button
          shape="round"
          border
          color="primary"
          onPress={action('clicked-mini1')}
          mini>
          <Text white caption center>
            Label
          </Text>
        </Button>
        <Button
          shape="round"
          border
          color="transparent"
          onPress={action('clicked-mini2')}
          mini>
          <Text primary caption center>
            Label
          </Text>
        </Button>
        <Button
          shape="round"
          border="#95acbf"
          color="transparent"
          onPress={action('clicked-mini3')}
          mini>
          <Text color="#95acbf" caption center>
            Label
          </Text>
        </Button>
      </Block>
    </>
  ))
  .add('small button', () => (
    <>
      <Block
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Button border color="primary" onPress={action('clicked-mini1')} small>
          <Text white caption center>
            Label
          </Text>
        </Button>
        <Button
          border
          color="transparent"
          onPress={action('clicked-mini2')}
          small>
          <Text primary caption center>
            Label
          </Text>
        </Button>
        <Button
          border="#95acbf"
          color="transparent"
          onPress={action('clicked-mini3')}
          small>
          <Text color="#95acbf" caption center>
            Label
          </Text>
        </Button>
      </Block>
      <Block
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        <Button
          shape="rectangle"
          border
          color="primary"
          onPress={action('clicked-mini1')}
          small>
          <Text white caption center>
            Label
          </Text>
        </Button>
        <Button
          shape="rectangle"
          border
          color="transparent"
          onPress={action('clicked-mini2')}
          small>
          <Text primary caption center>
            Label
          </Text>
        </Button>
        <Button
          shape="rectangle"
          border="#95acbf"
          color="transparent"
          onPress={action('clicked-mini3')}
          small>
          <Text color="#95acbf" caption center>
            Label
          </Text>
        </Button>
      </Block>
      <Block
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        <Button
          shape="round"
          border
          color="primary"
          onPress={action('clicked-mini1')}
          small>
          <Text white caption center>
            Label
          </Text>
        </Button>
        <Button
          shape="round"
          border
          color="transparent"
          onPress={action('clicked-mini2')}
          small>
          <Text primary caption center>
            Label
          </Text>
        </Button>
        <Button
          shape="round"
          border="#95acbf"
          color="transparent"
          onPress={action('clicked-mini3')}
          small>
          <Text color="#95acbf" caption center>
            Label
          </Text>
        </Button>
      </Block>
    </>
  ))
  .add('used like link', () => (
    <Block
      style={{
        justifyContent: 'center',
      }}>
      <Button
        style={{alignSelf: 'center'}}
        link
        onPress={action('clicked-link')}>
        <Text caption center bold primary>
          Button text >>
        </Text>
      </Button>
    </Block>
  ))
  .add('disabled', () => (
    <Button color="gray2" disabled onPress={action('clicked-shadow')}>
      <Text gray center bold>
        Button text
      </Text>
    </Button>
  ));
