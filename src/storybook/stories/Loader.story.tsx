import * as React from 'react';
import Loader from '../../components/Loader';
import CenterView from '../CenterView';
import {storiesOf} from '@storybook/react-native';
import {loader} from '../../static/markdown';
storiesOf('Loader', module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add('small', () => <Loader size="small" dotsAmount={4} />, {
    notes: {markdown: loader},
  })
  .add('large', () => <Loader size="large" dotsAmount={4} />);
