export const list = `## List Usage

\`\`\`js
import {List} from '@stryberventures/stryber-react-native-ui-components';

() => {
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
      onItemPress={item => console.log('item', item)}
    />
  );
};
\`\`\`

## Properties

| Props                                                    | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`data\`**    | array of IListItem                                                              |
| **\`onItemPress\`**  | Function that will be called on item press                                          |
| **\`titleText\`** | List title                                         |
| **\`titleLink\`**  | Title link text                                            |
| **\`onTitleLinkPress\`**      | Function that will be called on title link press   |
| **\`keyExtractor\`**      | Keyextractor function for FlatList   |

| IListItem                                                    | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`value\`**    | Main value of the list item                                                              |
| **\`valueStyles\`**  | Styles for value                                          |
| **\`secondaryValue\`** | A smaller value below the main value                                          |
| **\`secondaryValueStyles\`**  | Styles for secondaryValue                                            |
| **\`longValue\`**      | A smaller long value below the main value  |
| **\`longValueStyles\`**      | Styles for longValue   |
| **\`rightValue\`**      | A string that renders on the right side of the list item  |
| **\`rightValueStyles\`**      | Styles for rightValue  |
| **\`cardText\`**      | A text that will be shown when item opened  |
| **\`cardTextStyles\`**      | Styles fro cardText  |
| **\`withArrow\`**      | Show or hide arrow on the right side of the item  |
| **\`arrowStyles\`**      | Styles for arrow  |
| **\`image\`**      | Image source  |
| **\`fullHeightImage\`**      | Boolean, makes image full height  |
| **\`icon\`**      | Icon name that will be shown on the left side of the list item  |
| **\`iconProps\`**      | Icon props  |
| **\`iconBackground\`**      | Icon background color  |
| **\`checkBox\`**      | Boolean, show or hide checkbox  |
| **\`checkboxProps\`**      | Checkbox props  |
| **\`radioButton\`**      | Boolean, show or hide radiobutton  |
| **\`radioButtonProps\`**      | Radiobutton props  |
| **\`switch\`**      | Boolean, show or hide switch button  |
| **\`switchProps\`**      | Switch props  |
| **\`button\`**      | Boolean, show or hide button  |
| **\`buttonChildren\`**      | React element that renders inside of the button  |
| **\`buttonProps\`**      | Button props  |`;
