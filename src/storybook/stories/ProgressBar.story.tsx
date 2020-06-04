import * as React from "react";
import ProgressBar from "../../components/ProgressBar";
import CenterView from "../../components/CenterView";
import { progressBar } from "../../static/markdown";
import { storiesOf } from "@storybook/react-native";
storiesOf("ProgressBar", module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add(
    'default',
    () => (
      <>
        <ProgressBar size='small' value={1} totalValue={4} type='inline'/>
      </>
    ),
    { notes: { markdown: progressBar } }
  ).add('large size', () => (
    <>
      <ProgressBar size='large' value={1} totalValue={4} type='inline' />
    </>
  )).add('with title and value', () => (
    <>
      <ProgressBar size='small' value={1} totalValue={4} type='inline' title="Title" infoShowed={true}/>
    </>
  )).add('with steps', () => (
    <>
      <ProgressBar size='small' value={2} totalValue={4} type='steps' />
    </>
  ));