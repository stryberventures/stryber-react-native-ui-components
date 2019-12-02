import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../components/CenterView';

import AccordionPreview from '../components/AccordionPreview';

storiesOf('Accordion', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <AccordionPreview />;
  });
