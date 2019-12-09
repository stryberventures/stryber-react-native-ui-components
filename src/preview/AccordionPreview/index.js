import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Card, Switch, Accordion, Collapse, Block, Text} from '../../components';

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

export const CollapsePreview = () => {
  const [collapse, toggleCollapse] = React.useState(true);

  return (
    <View style={{height: 100}}>
      <Block flex={false} onPress={() => toggleCollapse(!collapse)}>
        <Text>Toggle content</Text>
      </Block>
      <Collapse
        duration={700}
        align="bottom"
        onAnimationEnd={() => console.log('End')}
        collapsed={collapse}>
        <Text>Main Content</Text>
      </Collapse>
    </View>
  );
};

export default class AccordionPreview extends Component {
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
