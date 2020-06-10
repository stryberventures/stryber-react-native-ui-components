import * as React from 'react';

import CardList, {IListItem} from '../../../components/CardList';

const longText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const CardListDefault = () => {
  const data = [...Array(10)].map((_, i) => {
    const item: IListItem = {
      text: 'Lorem ipsum',
    };
    if (i % 2 === 0) {
      item.secondaryText = longText;
    }
    return item;
  });
  return <CardList data={data} title="default" />;
};

export const CardListBlue = () => {
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
      title="card list with blue background"
      cardBackground="primary"
      textColor="#fff"
    />
  );
};

export const CardListBlueCheckboxesRight = () => {
  const data = [...Array(10)].map((_, i) => {
    const item: IListItem = {
      text: 'Lorem ipsum',
      checkboxProps: {
        text: '',
        bgColor: '#fff',
        tickColor: '#007aff',
        style: {
          left: 8,
        },
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
      title="card list with checkboxes on the right side and blue background"
      cardBackground="primary"
      textColor="#fff"
    />
  );
};

export const CardListCheckboxesLeft = () => {
  const data = [...Array(10)].map((_, i) => {
    const item: IListItem = {
      text: 'Lorem ipsum',
      checkboxProps: {
        text: '',
        style: {
          left: 8,
        },
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
      checkboxLeft
      title="card list with checkboxes on the left side"
    />
  );
};

export const CardListBlueRadioButtonsRight = () => {
  const data = [...Array(10)].map((_, i) => {
    const item: IListItem = {
      text: 'Lorem ipsum',
      radiobuttonProps: {
        text: '',
        bgColor: '#fff',
        activeRadioInner: '#007aff',
        style: {
          left: 8,
        },
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
      title="card list with radiobuttons on the right side and blue background"
      cardBackground="primary"
      textColor="#fff"
    />
  );
};

export const CardListRadioButtonsLeft = () => {
  const data = [...Array(10)].map((_, i) => {
    const item: IListItem = {
      text: 'Lorem ipsum',
      radiobuttonProps: {
        text: '',
        style: {
          left: 8,
        },
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
      radiobuttonLeft
      title="card list with radiobuttons on the left side"
    />
  );
};

export const CardListQuiz = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const data = [...Array(10)].map((_, i) => ({
    text: 'Lorem ipsum',
    secondaryText: i % 2 === 0 ? longText : undefined,
    quizCounter: alphabet[i].toUpperCase(),
  }));
  return <CardList data={data} quiz title="quiz card list" />;
};

export const CardListQuizBlue = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const data = [...Array(10)].map((_, i) => ({
    text: 'Lorem ipsum',
    secondaryText: i % 2 === 0 ? longText : undefined,
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
      title="quiz card list with different colours"
    />
  );
};

export const CardListQuizWithoutMultiselect = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const data = [...Array(10)].map((_, i) => ({
    text: 'Lorem ipsum',
    secondaryText: i % 2 === 0 ? longText : undefined,
    quizCounter: alphabet[i].toUpperCase(),
  }));
  return (
    <CardList multiSelect={false} data={data} quiz title="quiz card list" />
  );
};

export const CardListQuizWithDefaultSelection = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const data = [...Array(10)].map((_, i) => ({
    text: 'Lorem ipsum',
    secondaryText: i % 2 === 0 ? longText : undefined,
    quizCounter: alphabet[i].toUpperCase(),
  }));
  return <CardList defaultIndex={0} data={data} quiz title="quiz card list" />;
};
