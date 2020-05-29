export const cardList = `## Slider Usage

\`\`\`js
import {CardList} from '@stryberventures/stryber-react-native-ui-components';

() => {
  const data = [...Array(10)].fill({
    text: 'Lorem ipsum',
  });
  return <CardList data={data} title="title" />;
};
\`\`\`

## Properties

| Prop                    | Description                                         |
| -----------------------------------------------------------------------------|
| **\`data\`**         |   IListItem array                                |
| **\`title\`**       | String list title                              |
| **\`checkboxLeft\`**         | Boolean show or hide sheckboxes on the left side                                       |
| **\`checkboxRight\`**       | Boolean show or hide sheckboxes on the right side                                      | 
| **\`radiobuttonLeft\`**            | Boolean show or hide radiobuttons on the left side           |                                                                                                                                                                       
| **\`radiobuttonRight\`**          | Boolean show or hide radiobuttons on the right side  |
| **\`quiz\`**            | Boolean enable quize format                          |
| **\`quizBackground\`**           | String background color of quiz counter                        |
| **\`quizTextColor\`**       | String color of quiz counter  |  
| **\`cardBackground\`**      | String card background color    | 
| **\`textColor\`**        | String text color           |
| **\`keyExtractor\`**        | Keyextractor function for FlatList           |


| IListItem         | Description                                         |                                                                                    |
| ------------------------------------------------------------------------------------------------|
| **\`text\`**          | String base text        |
| **\`secondaryText\`**  | String secondary text                            |
| **\`checkboxProps\`**     | ICheckboxProps                   |
| **\`radiobuttonProps\`**          | ICheckboxProps        |
| **\`quizCounter\`**          | String text inside quiz element       |
`;
