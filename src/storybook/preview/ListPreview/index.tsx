import * as React from 'react';

import {List, Text} from '../../../components';
import {IListItem} from '../../../components/List';
import {defaultTheme as theme} from '../../../components/other/constants';

const middleLengthText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.";

const longText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const SimpleList = () => {
  const data = new Array(10).fill({
    value: 'Option',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
  });
  return (
    <List
      data={data}
      titleText="SUBHEAD TITLE"
      titleLink="Link"
      onItemPress={(item: any) => {
        // eslint-disable-next-line no-console
        console.log('item', item);
      }}
    />
  );
};

export const SimpleListWithIcons = () => {
  const data = new Array(10).fill({
    value: 'Option',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
    icon: 'Eye',
    iconProps: {
      fill: theme.colors.gray50,
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const SimpleListWithTwoLinesOfTextAndIcons = () => {
  const data = new Array(10).fill({
    value: 'Option',
    secondaryValue: 'second line',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
    icon: 'Eye',
    iconProps: {
      fill: theme.colors.gray50,
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const SimpleListWithTwoLinesOfText = () => {
  const data = new Array(10).fill({
    value: 'Option',
    secondaryValue: 'second line',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const SimpleListWithLongText = () => {
  const data = new Array(10).fill({
    value: 'Option',
    longValue: middleLengthText,
    withArrow: true,
    cardText: longText,
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithIcons = () => {
  const data = new Array(10).fill({
    value: 'Option',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
    icon: 'Eye',
    iconProps: {
      fill: theme.colors.white,
    },
    iconBackground: theme.colors.primary,
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithTwoLinesOfTextAndIcons = () => {
  const data = new Array(10).fill({
    value: 'Option',
    secondaryValue: 'second line',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
    icon: 'Eye',
    iconProps: {
      fill: theme.colors.white,
    },
    iconBackground: theme.colors.primary,
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithImages = () => {
  const data = new Array(10).fill({
    value: 'Option',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
    image: {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithTwoLinesOfTextAndImages = () => {
  const data = new Array(10).fill({
    value: 'Option',
    secondaryValue: 'second line',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
    image: {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithImagesAndLongText = () => {
  const data = new Array(10).fill({
    longValue: middleLengthText,
    value: 'Option',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
    image: {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithFullHeightImages = () => {
  const data = new Array(10).fill({
    value: 'Option',
    rightValue: 'Value',
    withArrow: true,
    cardText: longText,
    fullHeightImage: true,
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/ru/7/74/Dr_Evil.jpg',
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithCheckboxes = () => {
  const data = new Array(10).fill({
    value: 'Option',
    image: {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    checkBox: true,
    checkboxProps: {
      style: {
        left: 12.5,
      },
      text: '',
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithRadioButtons = () => {
  const data = new Array(10).fill({
    value: 'Option',
    secondaryValue: 'second line',
    image: {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    radioButton: true,
    radioButtonProps: {
      style: {
        left: 12.5,
      },
      text: '',
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithSwitchButtons = () => {
  const data = new Array(10).fill({
    value: 'Option',
    image: {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    switch: true,
    switchProps: {
      style: {
        left: 12.5,
      },
      text: '',
      containerStyle: {
        width: 59,
        height: 32,
        borderRadius: 28,
        backgroundColor: 'rgb(227,227,227)',
        padding: 3,
      },
      circleStyle: {
        width: 28,
        height: 28,
        borderRadius: 12.5,
        backgroundColor: 'white',
      },
    },
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithButtons = () => {
  const data = new Array(10).fill({
    value: 'Option',
    secondaryValue: 'second line',
    icon: 'Eye',
    iconProps: {
      fill: theme.colors.white,
    },
    iconBackground: theme.colors.primary,
    button: true,
    buttonProps: {
      size: 'small',
    },
    buttonChildren: 'button text',
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithButtonsAndImages = () => {
  const data = new Array(10).fill({
    value: 'Option',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/ru/7/74/Dr_Evil.jpg',
    },
    button: true,
    buttonProps: {
      size: 'small',
    },
    buttonChildren: 'button text',
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithButtonsAndFullHeightImages = () => {
  const data = new Array(10).fill({
    value: 'Option',
    secondaryValue: 'second line',
    fullHeightImage: true,
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/ru/7/74/Dr_Evil.jpg',
    },
    button: true,
    buttonProps: {
      size: 'small',
    },
    buttonChildren: <Text white>button text</Text>,
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};

export const ListWithMultipleControl = () => {
  const data = [...Array(10)].map((_, i) => {
    const item: IListItem = {
      value: 'Option',
      withArrow: true,
      cardText: longText,
    };
    if (i === 1) {
      item.withArrow = false;
      item.cardText = undefined;
      item.checkBox = true;
      item.checkboxProps = {
        text: '',
        style: {
          left: 12.5,
        },
      };
    }
    if (i === 2) {
      item.withArrow = false;
      item.cardText = undefined;
      item.radioButton = true;
      item.radioButtonProps = {
        text: '',
        style: {
          left: 12.5,
        },
      };
    }
    if (i === 3) {
      item.withArrow = false;
      item.cardText = undefined;
      item.switch = true;
      item.switchProps = {
        style: {
          left: 12.5,
        },
        text: '',
        containerStyle: {
          width: 59,
          height: 32,
          borderRadius: 28,
          backgroundColor: 'rgb(227,227,227)',
          padding: 3,
        },
        circleStyle: {
          width: 28,
          height: 28,
          borderRadius: 12.5,
          backgroundColor: 'white',
        },
      };
    }
    if (i === 4) {
      item.withArrow = false;
      item.cardText = undefined;
      item.rightValue = 'Value';
    }
    if (i === 5) {
      item.rightValue = 'Value';
    }
    return item;
  });
  return <List data={data} titleText="SUBHEAD TITLE" titleLink="Link" />;
};
