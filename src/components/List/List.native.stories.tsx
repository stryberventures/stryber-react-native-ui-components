import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';
import CenterView from '../../components/CenterView';
import {list} from '../../static/markdown';
import {
  SimpleList,
  SimpleListWithIcons,
  SimpleListWithTwoLinesOfTextAndIcons,
  SimpleListWithTwoLinesOfText,
  SimpleListWithLongText,
  ListWithIcons,
  ListWithTwoLinesOfTextAndIcons,
  ListWithImages,
  ListWithTwoLinesOfTextAndImages,
  ListWithImagesAndLongText,
  ListWithFullHeightImages,
  ListWithCheckboxes,
  ListWithRadioButtons,
  ListWithSwitchButtons,
  ListWithButtons,
  ListWithMultipleControl,
  ListWithButtonsAndImages,
  ListWithButtonsAndFullHeightImages,
} from '../../storybook/preview/ListPreview';

storiesOf('List', module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: {markdown: list},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('simple list', () => <SimpleList />)
  .add('simple list with icons', () => <SimpleListWithIcons />)
  .add('simple list with two lines of text and icons', () => (
    <SimpleListWithTwoLinesOfTextAndIcons />
  ))
  .add('simple list with two lines of text', () => (
    <SimpleListWithTwoLinesOfText />
  ))
  .add('simple list with a long text', () => <SimpleListWithLongText />)
  .add('list with icons', () => <ListWithIcons />)
  .add('list with two lines of text and icons', () => (
    <ListWithTwoLinesOfTextAndIcons />
  ))
  .add('list with images', () => <ListWithImages />)
  .add('list with two lines of text and images', () => (
    <ListWithTwoLinesOfTextAndImages />
  ))
  .add('list with images and a long text', () => <ListWithImagesAndLongText />)
  .add('list with full height images', () => <ListWithFullHeightImages />)
  .add('list with checkboxes', () => <ListWithCheckboxes />)
  .add('list with radio buttons', () => <ListWithRadioButtons />)
  .add('list with switch buttons', () => <ListWithSwitchButtons />)
  .add('list with buttons', () => <ListWithButtons />)
  .add('list with buttons and images', () => <ListWithButtonsAndImages />)
  .add('list with buttons and full height images', () => (
    <ListWithButtonsAndFullHeightImages />
  ))
  .add('simple list with multiple control', () => <ListWithMultipleControl />);
