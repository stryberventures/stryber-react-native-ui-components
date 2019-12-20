import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableHighlight, ViewPropTypes} from 'react-native';

import {Collapse} from '../index';

export default class Accordion extends Component {
  toggle(section) {
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

    const renderCollapsible = (section, key) => (
      <Collapse
        collapsed={!activeSections.includes(key)}
        onAnimationEnd={() => onAnimationEnd(section, key)}>
        {renderContent(section, key, activeSections.includes(key), sections)}
      </Collapse>
    );

    return (
      <View style={containerStyle}>
        {sections.map((section, key) => (
          <View key={key} style={sectionContainerStyle}>
            {renderSectionTitle(section, key, activeSections.includes(key))}

            {expandFromBottom && renderCollapsible(section, key)}

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

Accordion.propTypes = {
  sections: PropTypes.array.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  renderSectionTitle: PropTypes.func,
  activeSections: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  underlayColor: PropTypes.string,
  touchableComponent: PropTypes.func,
  touchableProps: PropTypes.object,
  disabled: PropTypes.bool,
  expandFromBottom: PropTypes.bool,
  expandMultiple: PropTypes.bool,
  onAnimationEnd: PropTypes.func,
  sectionContainerStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  renderFooter: PropTypes.func,
};
