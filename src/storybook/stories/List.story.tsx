import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';
import List from '../../components/List';
import {defaultTheme as theme} from '../../components/other/constants';
// @ts-ignore
import CenterView from '../../components/CenterView';
import {list} from '../../static/markdown';

storiesOf('List', module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: {markdown: list},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('Simple list', () => {
    const simpleData = new Array(10).fill({
      value: 'Option',
      rightValue: 'Value',
      withArrow: true,
    });
    return (
      <List data={simpleData} titleText="SUBHEAD TITLE" titleLink="Link" />
    );
  })
  .add('Simple list with icons', () => {
    const simpleDataWithIcons = new Array(10).fill({
      value: 'Option',
      rightValue: 'Value',
      withArrow: true,
      icon: 'Eye',
      iconProps: {
        fill: theme.colors.gray50,
      },
    });
    return (
      <List
        data={simpleDataWithIcons}
        titleText="SUBHEAD TITLE"
        titleLink="Link"
      />
    );
  })
  .add('Simple list with two lines of text', () => {
    const simpleDataWithFullHeightImages = new Array(10).fill({
      value: 'Option',
      secondValue: 'second line',
      rightValue: 'Value',
      withArrow: true,
    });
    return (
      <List
        data={simpleDataWithFullHeightImages}
        titleText="SUBHEAD TITLE"
        titleLink="Link"
      />
    );
  })
  .add('List with icons', () => {
    const simpleDataWithIcons = new Array(10).fill({
      value: 'Option',
      rightValue: 'Value',
      withArrow: true,
      icon: 'Eye',
      iconProps: {
        fill: theme.colors.white,
      },
      iconBackground: theme.colors.primary,
    });
    return (
      <List
        data={simpleDataWithIcons}
        titleText="SUBHEAD TITLE"
        titleLink="Link"
      />
    );
  })
  .add('List with images', () => {
    const simpleDataWithImages = new Array(10).fill({
      value: 'Option',
      rightValue: 'Value',
      withArrow: true,
      image: {
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      },
    });
    return (
      <List
        data={simpleDataWithImages}
        titleText="SUBHEAD TITLE"
        titleLink="Link"
      />
    );
  })
  .add('List with full height images', () => {
    const simpleDataWithFullHeightImages = new Array(10).fill({
      value: 'Option',
      rightValue: 'Value',
      withArrow: true,
      fullHeightImage: true,
      image: {
        uri: 'https://upload.wikimedia.org/wikipedia/ru/7/74/Dr_Evil.jpg',
      },
    });
    return (
      <List
        data={simpleDataWithFullHeightImages}
        titleText="SUBHEAD TITLE"
        titleLink="Link"
      />
    );
  });
