import React, {Component} from 'react';
import {View, TouchableHighlight} from 'react-native';
import Collapse from '../Collapse';
interface IAccordionProps {
  sections: any[];
  renderHeader: (...args: any[]) => any;
  renderContent: (...args: any[]) => any;
  renderSectionTitle?: (...args: any[]) => any;
  activeSections: number[];
  onChange: (...args: any[]) => any;
  underlayColor?: string;
  touchableComponent?: (...args: any[]) => any;
  touchableProps?: any;
  disabled?: boolean;
  expandFromBottom?: boolean;
  expandMultiple?: boolean;
  onAnimationEnd?: (...args: any[]) => any;
  sectionContainerStyle?: any;
  containerStyle?: any;
  renderFooter?: (...args: any[]) => any;
}
export default class Accordion extends Component<IAccordionProps, {}> {
  static defaultProps: any;
  toggle(section: any) {
    if (!this.props.disabled) {
      const {activeSections, expandMultiple, onChange} = this.props;
      let updatedSections = [];
      if (activeSections.includes(section)) {
        updatedSections = activeSections.filter(a => a !== section);
      } else if (expandMultiple) {
        updatedSections = [...activeSections, section];
      } else {
        updatedSections = [section];
      }
      onChange && onChange(updatedSections);
    }
  }
  render() {
    const {
      activeSections,
      containerStyle,
      sectionContainerStyle,
      expandFromBottom,
      sections,
      underlayColor,
      touchableProps,
      touchableComponent: Touchable,
      onAnimationEnd,
      renderContent,
      renderHeader,
      renderFooter,
      renderSectionTitle,
    } = this.props;
    const renderCollapsible = (section: any, key: any) => (
      <Collapse
        collapsed={!activeSections.includes(key)}
        onAnimationEnd={() => onAnimationEnd!(section, key)}>
        {renderContent(section, key, activeSections.includes(key), sections)}
      </Collapse>
    );
    return (
      <View style={containerStyle}>
        {sections.map((section, key) => (
          <View key={key} style={sectionContainerStyle}>
            {renderSectionTitle!(section, key, activeSections.includes(key))}

            {expandFromBottom && renderCollapsible(section, key)}
            {/*
  // @ts-ignore */}
            <Touchable
              onPress={() => this.toggle(key)}
              underlayColor={underlayColor}
              {...touchableProps}>
              {renderHeader(
                section,
                key,
                activeSections.includes(key),
                sections,
              )}
            </Touchable>

            {!expandFromBottom && renderCollapsible(section, key)}

            {renderFooter &&
              renderFooter(
                section,
                key,
                activeSections.includes(key),
                sections,
              )}
          </View>
        ))}
      </View>
    );
  }
}
Accordion.defaultProps = {
  underlayColor: 'black',
  disabled: false,
  expandFromBottom: false,
  expandMultiple: false,
  touchableComponent: TouchableHighlight,
  renderSectionTitle: () => {},
  onAnimationEnd: () => {},
  sectionContainerStyle: {},
  touchableProps: {},
  containerStyle: {},
};
