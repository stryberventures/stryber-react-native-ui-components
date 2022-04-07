import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import CenterView from '../CenterView';
import AccordionPreview from '../preview/AccordionPreview';
import {CollapsePreview} from '../preview/AccordionPreview';
import {collapse, accordion} from '../../static/markdown';
storiesOf('Accordion', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <AccordionPreview />, {
    notes: {markdown: accordion},
  })
  .add('collapse', () => <CollapsePreview />, {
    notes: {markdown: collapse},
  });
