import * as React from 'react';
import CardList from '../../components/CardList';
// @ts-ignore
import CenterView from '../../components/CenterView';
import {cardList} from '../../static/markdown';
import {storiesOf} from '@storybook/react-native';
import {IListItem} from '../../components/CardList';

const longText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

storiesOf('CardList', module)
  .addParameters({
    notes: {markdown: cardList},
  })
  .addDecorator((getStory: any) => <CenterView middle>{getStory()}</CenterView>)
  .add('default', () => {
    const data = [...Array(10)].map((_, i) => {
      const item: IListItem = {
        text: 'Lorem ipsum',
      };
      if (i % 2 === 0) {
        item.secondaryText = longText;
      }
      return item;
    });
    return <CardList data={data} title="Title" />;
  })
  .add('Card list with blue background', () => {
    const data = [...Array(10)].map((_, i) => {
      const item: IListItem = {
        text: 'Lorem ipsum',
      };
      if (i % 2 === 0) {
        item.secondaryText = longText;
      }
      return item;
    });
    return (
      <CardList
        data={data}
        title="Title"
        cardBackground="primary"
        textColor="#fff"
      />
    );
  })
  .add(
    'Card list with checkboxes on the right side and blue background',
    () => {
      const data = [...Array(10)].map((_, i) => {
        const item: IListItem = {
          text: 'Lorem ipsum',
          checkboxProps: {
            text: '',
          },
        };
        if (i % 2 === 0) {
          item.secondaryText = longText;
        }
        return item;
      });
      return (
        <CardList
          data={data}
          checkboxRight
          title="Title"
          cardBackground="primary"
          textColor="#fff"
        />
      );
    },
  )
  .add('Card list with checkboxes on the left side', () => {
    const data = [...Array(10)].map((_, i) => {
      const item: IListItem = {
        text: 'Lorem ipsum',
        checkboxProps: {
          text: '',
        },
      };
      if (i % 2 === 0) {
        item.secondaryText = longText;
      }
      return item;
    });
    return <CardList data={data} checkboxLeft title="Title" />;
  })
  .add(
    'Card list with radiobuttons on the right side and blue background',
    () => {
      const data = [...Array(10)].map((_, i) => {
        const item: IListItem = {
          text: 'Lorem ipsum',
          radiobuttonProps: {
            text: '',
          },
        };
        if (i % 2 === 0) {
          item.secondaryText = longText;
        }
        return item;
      });
      return (
        <CardList
          data={data}
          radiobuttonRight
          title="Title"
          cardBackground="primary"
          textColor="#fff"
        />
      );
    },
  )
  .add('Card list with radiobuttons on the left side', () => {
    const data = [...Array(10)].map((_, i) => {
      const item: IListItem = {
        text: 'Lorem ipsum',
        radiobuttonProps: {
          text: '',
        },
      };
      if (i % 2 === 0) {
        item.secondaryText = longText;
      }
      return item;
    });
    return <CardList data={data} radiobuttonLeft title="Title" />;
  })
  .add('Quiz card list', () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const data = [...Array(10)].map((_, i) => ({
      text: 'Lorem ipsum',
      quizCounter: alphabet[i].toUpperCase(),
    }));
    return <CardList data={data} quiz title="Title" />;
  })
  .add('Quiz card list with different colours', () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const data = [...Array(10)].map((_, i) => ({
      text: 'Lorem ipsum',
      quizCounter: alphabet[i].toUpperCase(),
    }));
    return (
      <CardList
        data={data}
        cardBackground="primary"
        textColor="#fff"
        quiz
        quizBackground="#fff"
        quizTextColor="primary"
        title="Title"
      />
    );
  });
