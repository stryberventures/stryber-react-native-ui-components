import * as React from 'react';
import ProgressBar from '../../components/ProgressBar';
import CenterView from '../../storybook/CenterView';
import {progressBar} from '../../static/markdown';
import {storiesOf} from '@storybook/react-native';
storiesOf('ProgressBar', module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add(
    'default',
    () => (
      <>
        <ProgressBar size="small" value={1} totalValue={4} variant="inline" />
      </>
    ),
    {notes: {markdown: progressBar}},
  )
  .add('large size', () => (
    <>
      <ProgressBar size="large" value={1} totalValue={4} variant="inline" />
    </>
  ))
  .add('with title and value', () => (
    <>
      <ProgressBar
        size="small"
        value={1}
        totalValue={4}
        variant="inline"
        title="Title"
        infoShowed={true}
      />
    </>
  ))
  .add('with dots', () => (
    <>
      <ProgressBar size="small" value={2} totalValue={4} variant="dots" />
    </>
  ))
  .add('with steps', () => (
    <>
      <ProgressBar size="small" value={2} totalValue={4} variant="steps" />
    </>
  ));
