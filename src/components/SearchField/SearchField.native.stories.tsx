import * as React from 'react';
import SearchField from './index';
import CenterView from '../../storybook/CenterView';
import {storiesOf} from '@storybook/react-native';

storiesOf('SearchField', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <SearchField placeholder="Search field" />;
  });
