export const accordion = `## Accordion Usage

\`\`\`js
import {Accordion} from '@stryberventures/stryber-react-native-ui-components';

() => (
  <Accordion
    activeSections={[0]}
    sections={['Section 1', 'Section 2', 'Section 3']}
    renderSectionTitle={this._renderSectionTitle}
    renderHeader={this._renderHeader}
    renderContent={this._renderContent}
    onChange={this._updateSections}
  />
);
\`\`\`

## Properties

| Prop                                                    | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`sections\`**                                          | An array of sections passed to the render methods                                                              |
| **\`renderHeader(content, index, isActive, sections)\`**  | A function that should return a renderable representing the header                                             |
| **\`renderContent(content, index, isActive, sections)\`** | A function that should return a renderable representing the content                                            |
| **\`renderFooter(content, index, isActive, sections)\`**  | A function that should return a renderable representing the footer                                             |
| **\`renderSectionTitle(content, index, isActive)\`**      | A function that should return a renderable representing the title of the section outside the touchable element |
| **\`onChange(indexes)\`**                                 | A function that is called when the currently active section(s) are updated.                                    |
| **\`activeSections\`**                                    | Control which indices in the \`sections\` array are currently open. If empty, closes all sections.               |
| **\`underlayColor\`**                                     | The color of the underlay that will show through when tapping on headers. Defaults to black.                   |
| **\`touchableComponent\`**                                | The touchable component used in the Accordion. Defaults to \`TouchableHighlight\`                                |
| **\`touchableProps\`**                                    | Properties for the \`touchableComponent\`                                                                        |
| **\`disabled\`**                                          | Set whether the user can interact with the Accordion                                                           |
| **\`align\`**                                             | See \`Collapsible\`                                                                                              |
| **\`duration\`**                                          | See \`Collapsible\`                                                                                              |
| **\`easing\`**                                            | See \`Collapsible\`                                                                                              |
| **\`onAnimationEnd(key, index)\`**                        | See \`Collapsible\`.                                                                                             |
| **\`expandFromBottom\`**                                  | Expand content from the bottom instead of the top                                                              |
| **\`expandMultiple\`**                                    | Allow more than one section to be expanded. Defaults to false.                                                 |
| **\`sectionContainerStyle\`**                             | Optional styling for the section container.                                                                    |
| **\`containerStyle\`**                                    | Optional styling for the Accordion container.                                                                  |

##Demo
![demo](https://cloud.githubusercontent.com/assets/378279/8047315/0237ca2c-0e44-11e5-9a16-1da052406eb0.gif)

##Example

\`\`\`js
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Card,
  Switch,
  Accordion,
  Text,
} from '@stryberventures/stryber-react-native-ui-components';

const SECTIONS = [
  {
    columnNames: ['Konto Plus', '10%', '0.1%'],
    contents: ['Context Field', 'Old Value', 'New Value'],
  },
  {
    columnNames: ['Konto Plus', '10%', '0.1%'],
    contents: ['Context Field', 'Old Value', 'New Value'],
  },
  {
    columnNames: ['Konto Plus', '10%', '0.1%'],
    contents: ['Context Field', 'Old Value', 'New Value'],
  },
  {
    columnNames: ['Konto Plus', '10%', '0.1%'],
    contents: ['Context Field', 'Old Value', 'New Value'],
  },
  {
    columnNames: ['Konto Plus', '10%', '0.1%'],
    contents: ['Context Field', 'Old Value', 'New Value'],
  },
  {
    columnNames: ['Konto Plus', '10%', '0.1%'],
    contents: ['Context Field', 'Old Value', 'New Value'],
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Fifth',
    value: 4,
  },
  {
    title: 'None',
  },
];

class AccordionPreview extends Component {
  state = {
    activeSections: [],
    openMultiple: false,
  };

  renderHeader = (section, index, isOpen) => {
    return (
      <View
        style={[
          styles.header,
          index % 2 === 1 ? {backgroundColor: '#eceff1'} : {},
        ]}>
        {section.columnNames.map((name, idx) => (
          <Text key={idx} style={styles.headerText}>
            {name}
          </Text>
        ))}
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
          {isOpen ? (
            <Icon name="ios-arrow-up" size={20} color="#90a4ae" />
          ) : (
            <Icon name="ios-arrow-down" size={20} color="#90a4ae" />
          )}
        </View>
      </View>
    );
  };

  renderContent = (section, index) => {
    return (
      <View
        style={[
          styles.content,
          index % 2 === 1 ? {backgroundColor: '#eceff1'} : {},
        ]}>
        {section.contents.map((content, idx) => (
          <Text key={idx} style={styles.headerText}>
            {content}
          </Text>
        ))}
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({activeSections});
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  render() {
    return (
      <View>
        <Switch
          style={{marginBottom: 20, alignSelf: 'center'}}
          text="Multiple open"
          isChacked={this.state.openMultiple}
          onPress={() =>
            this.setState(prevState => ({
              openMultiple: !prevState.openMultiple,
            }))
          }
        />

        <View style={styles.selectors}>
          <Text style={styles.selectTitle}>Select:</Text>

          {SELECTORS.map(selector => (
            <TouchableOpacity
              key={selector.title}
              onPress={() => this.setSections([selector.value])}>
              <Card style={styles.selector}>
                <Text
                  style={
                    this.state.activeSections.includes(selector.value) &&
                    styles.activeSelector
                  }>
                  {selector.title}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Card shadow>
          <View style={styles.headerTitle}>
            <Text style={styles.headerText}>Strategie</Text>
            <Text style={styles.headerText}>Aktien­gewicht</Text>
            <Text style={styles.headerText}>Year</Text>
          </View>
          <Accordion
            sections={SECTIONS}
            activeSections={this.state.activeSections}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            onChange={this.updateSections}
            expandMultiple={this.state.openMultiple}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
  },
  headerTitle: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: '#95acbf',
  },
  headerText: {
    fontSize: 14,
    width: '40%',
  },
  content: {
    padding: 10,
    flexDirection: 'row',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
\`\`\`
`;
