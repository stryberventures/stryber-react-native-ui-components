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
  ListWithButtonsAndImages,
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
  .add('Simple list with a long text', () => <SimpleListWithLongText />)
  .add('List with icons', () => <ListWithIcons />)
  .add('List with images', () => <ListWithImages />)
  .add('List with images and a long text', () => <ListWithImagesAndLongText />)
  .add('List with full height images', () => <ListWithFullHeightImages />)
  .add('List with checkboxes', () => <ListWithCheckboxes />)
  .add('List with radio buttons', () => <ListWithRadioButtons />)
  .add('List with switch buttons', () => <ListWithSwitchButtons />)
  .add('List with buttons', () => <ListWithButtons />)
  .add('List with buttons and images', () => <ListWithButtonsAndImages />)
  .add('Simple list with multiple control', () => <ListWithMultipleControl />);
