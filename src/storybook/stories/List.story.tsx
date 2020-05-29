import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';
// @ts-ignore
import CenterView from '../../components/CenterView';
import {list} from '../../static/markdown';
import {
  SimpleList,
  SimpleListWithIcons,
  SimpleListWithTwoLinesOfText,
  SimpleListWithLongText,
  ListWithIcons,
  ListWithImages,
  ListWithImagesAndLongText,
  ListWithFullHeightImages,
  ListWithCheckboxes,
  ListWithRadioButtons,
  ListWithSwitchButtons,
  ListWithButtons,
  ListWithMultipleControl,
} from '../preview/ListPreview';

storiesOf('List', module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: {markdown: list},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('simple list', () => <SimpleList />)
  .add('simple list with icons', () => <SimpleListWithIcons />)
  .add('simple list with two lines of text', () => (
    <SimpleListWithTwoLinesOfText />
  ))
  .add('simple list with a long text', () => <SimpleListWithLongText />)
  .add('list with icons', () => <ListWithIcons />)
  .add('list with images', () => <ListWithImages />)
  .add('list with images and a long text', () => <ListWithImagesAndLongText />)
  .add('list with full height images', () => <ListWithFullHeightImages />)
  .add('list with checkboxes', () => <ListWithCheckboxes />)
  .add('list with radio buttons', () => <ListWithRadioButtons />)
  .add('list with switch buttons', () => <ListWithSwitchButtons />)
  .add('list with buttons', () => <ListWithButtons />)
  .add('simple list with multiple control', () => <ListWithMultipleControl />);
