import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Dropdown from '../components/Dropdown';
import CenterView from '../components/CenterView';

storiesOf('Dropdown', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return (
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
            value: 'Sfdg',
          },
          {
            value: 'dsfsdf',
          },
        ]}
      />
    );
  });
