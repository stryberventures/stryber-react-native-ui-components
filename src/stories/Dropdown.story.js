import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Dropdown from '../components/Dropdown';
import CenterView from '../components/CenterView';

storiesOf('Dropdown', module)
  .add('default', () => {
    return (
      <CenterView>
        <Dropdown
          data={[
            {
              value: 'Banana',
            },
            {
              value: 'Mango',
            },
            {
              value: 'Pear',
            },
            {
              value: 'Cocoa',
            },
            {
              value: 'Cherry',
            },
          ]}
        />
      </CenterView>
    );
  })
  .add('bottom', () => {
    return (
      <CenterView bottom>
        <Dropdown
          data={[
            {
              value: 'Banana',
            },
            {
              value: 'Mango',
            },
            {
              value: 'Pear',
            },
            {
              value: 'Cocoa',
            },
            {
              value: 'Cherry',
            },
          ]}
        />
      </CenterView>
    );
  });
