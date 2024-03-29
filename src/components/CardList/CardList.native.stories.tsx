import * as React from 'react';

import CenterView from '../../storybook/CenterView';
import {cardList} from '../../static/markdown';
import {storiesOf} from '@storybook/react-native';
import {
  CardListDefault,
  CardListBlue,
  CardListBlueCheckboxesRight,
  CardListCheckboxesLeft,
  CardListBlueRadioButtonsRight,
  CardListRadioButtonsLeft,
  CardListQuiz,
  CardListQuizBlue,
  CardListQuizWithoutMultiselect,
  CardListQuizWithDefaultSelection,
} from '../../storybook/preview/CardList';

storiesOf('CardList', module)
  .addParameters({
    notes: {markdown: cardList},
  })
  .addDecorator((getStory: any) => <CenterView middle>{getStory()}</CenterView>)
  .add('default', () => <CardListDefault />)
  .add('card list with blue background', () => <CardListBlue />)
  .add(
    'card list with checkboxes on the right side and blue background',
    () => <CardListBlueCheckboxesRight />,
  )
  .add('card list with checkboxes on the left side', () => (
    <CardListCheckboxesLeft />
  ))
  .add(
    'card list with radiobuttons on the right side and blue background',
    () => <CardListBlueRadioButtonsRight />,
  )
  .add('card list with radiobuttons on the left side', () => (
    <CardListRadioButtonsLeft />
  ))
  .add('quiz card list', () => <CardListQuiz />)
  .add('quiz card list with different colours', () => <CardListQuizBlue />)
  .add('quiz card list without multiselect', () => (
    <CardListQuizWithoutMultiselect />
  ))
  .add('quiz card list with default selected item', () => (
    <CardListQuizWithDefaultSelection />
  ));
