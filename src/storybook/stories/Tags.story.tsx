import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import TagsPreview from '../preview/TagsPreview';
import CenterView from '../../components/CenterView';
import {tags} from '../../static/markdown';

storiesOf('Tags', module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add('small', () => <TagsPreview size="small" />, {notes: {markdown: tags}})
  .add('large', () => <TagsPreview size="large" />)
  .add('with cross', () => <TagsPreview size="small" withCross />)
  .add('with preselected tags', () => (
    <TagsPreview preselectedTemplate size="small" />
  ))
  .add('different color', () => (
    <TagsPreview size="small" withCross color="#4624bf" textColor="#757575" />
  ))
  .add('with reset functionality', () => (
    <TagsPreview size="large" resetFunctionality />
  ))
  .add('with disabled tags', () => (
    <TagsPreview partiallyDisabledTemplate size="small" />
  ))
  .add('with disabled tags and custom colors', () => (
    <TagsPreview
      partiallyDisabledTemplate
      size="small"
      disabledColor="#979797"
      selectedColor="#FC775B"
    />
  ));
