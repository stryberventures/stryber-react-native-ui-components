import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Accordion from '../components/Accordion';

storiesOf('Accordion', module).add('default', () => {
  return <Accordion />;
});
