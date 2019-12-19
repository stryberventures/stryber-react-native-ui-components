import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../components/CenterView';
import AccordionPreview from '../preview/AccordionPreview';
import {CollapsePreview} from '../preview/AccordionPreview';

storiesOf('Accordion', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <AccordionPreview />)
  .add('collapse', () => <CollapsePreview />);
