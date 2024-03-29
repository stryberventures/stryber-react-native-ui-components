import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {ButtonCounter, Text} from '../../index';
import CenterView from '../../storybook/CenterView';
import {buttonCounter} from '../../static/markdown';

storiesOf('ButtonCounter', module)
  .addParameters({
    notes: {markdown: buttonCounter},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('general', () => (
    <CenterView>
      <ButtonCounter
        renderCount={(count, style) => (
          <Text style={style}>
            8.50 AED <Text style={[style, {color: '#fda717'}]}>x {count}</Text>
          </Text>
        )}
        onCountChange={() => null}>
        Add item
      </ButtonCounter>
    </CenterView>
  ))
  .add('min/max value', () => (
    <CenterView>
      <ButtonCounter
        color="#FDA717"
        renderCount={(count, style) => (
          <Text style={style}>
            8.50 AED <Text style={[style, {color: '#fda717'}]}>x {count}</Text>
          </Text>
        )}
        initialValue={1}
        minValue={1}
        maxValue={5}
        onCountChange={() => null}>
        Add item
      </ButtonCounter>
    </CenterView>
  ))
  .add('mini', () => (
    <CenterView>
      <ButtonCounter
        color="#FDA717"
        size="mini"
        initialValue={1}
        renderCount={(count, style) => <Text style={style}>{count}</Text>}
        onCountChange={() => {}}>
        Add item
      </ButtonCounter>
    </CenterView>
  ))
  .add('small', () => (
    <CenterView>
      <ButtonCounter
        color="#FDA717"
        size="small"
        secondaryColor="black"
        initialValue={1}
        renderCount={(count, style) => <Text style={style}>{count}</Text>}
        onCountChange={() => {}}>
        Add item
      </ButtonCounter>
    </CenterView>
  ));
