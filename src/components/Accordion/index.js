import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableHighlight, Animated, Easing} from 'react-native';
import {ViewPropTypes} from './config';

const ANIMATED_EASING_PREFIXES = ['easeInOut', 'easeOut', 'easeIn'];

export class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measuring: false,
      measured: false,
      height: new Animated.Value(props.collapsedHeight),
      contentHeight: 0,
      animating: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.setState({measured: false}, () =>
        this._componentDidUpdate(prevProps),
      );
    } else {
      this._componentDidUpdate(prevProps);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _componentDidUpdate(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this._toggleCollapsed(this.props.collapsed);
    } else if (
      this.props.collapsed &&
      prevProps.collapsedHeight !== this.props.collapsedHeight
    ) {
      this.state.height.setValue(this.props.collapsedHeight);
    }
  }

  contentHandle = null;

  _handleRef = ref => {
    this.contentHandle = ref;
  };

  _measureContent(callback) {
    this.setState(
      {
        measuring: true,
      },
      () => {
        requestAnimationFrame(() => {
          if (!this.contentHandle) {
            this.setState(
              {
                measuring: false,
              },
              () => callback(this.props.collapsedHeight),
            );
          } else {
            this.contentHandle.getNode().measure((x, y, width, height) => {
              this.setState(
                {
                  measuring: false,
                  measured: true,
                  contentHeight: height,
                },
                () => callback(height),
              );
            });
          }
        });
      },
    );
  }

  _toggleCollapsed(collapsed) {
    if (collapsed) {
      this._transitionToHeight(this.props.collapsedHeight);
    } else if (!this.contentHandle) {
      if (this.state.measured) {
        this._transitionToHeight(this.state.contentHeight);
      }
      return;
    } else {
      this._measureContent(contentHeight => {
        this._transitionToHeight(contentHeight);
      });
    }
  }

  _transitionToHeight(height) {
    const {duration} = this.props;
    let easing = this.props.easing;
    if (typeof easing === 'string') {
      let prefix;
      let found = false;
      for (let i = 0; i < ANIMATED_EASING_PREFIXES.length; i++) {
        prefix = ANIMATED_EASING_PREFIXES[i];
        if (easing.substr(0, prefix.length) === prefix) {
          easing =
            easing.substr(prefix.length, 1).toLowerCase() +
            easing.substr(prefix.length + 1);
          prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5);
          easing = Easing[prefix](Easing[easing || 'ease']);
          found = true;
          break;
        }
      }
      if (!found) {
        easing = Easing[easing];
      }
      if (!easing) {
        throw new Error('Invalid easing type "' + this.props.easing + '"');
      }
    }

    if (this._animation) {
      this._animation.stop();
    }
    this.setState({animating: true});
    this._animation = Animated.timing(this.state.height, {
      toValue: height,
      duration,
      easing,
    }).start(() => {
      if (this.unmounted) {
        return;
      }
      this.setState({animating: false}, () => {
        if (this.unmounted) {
          return;
        }
        this.props.onAnimationEnd();
      });
    });
  }

  _handleLayoutChange = event => {
    const contentHeight = event.nativeEvent.layout.height;
    if (
      this.state.animating ||
      this.props.collapsed ||
      this.state.measuring ||
      this.state.contentHeight === contentHeight
    ) {
      return;
    }

    this.state.height.setValue(contentHeight);
    this.setState({contentHeight});
  };

  render() {
    const {collapsed, enablePointerEvents} = this.props;
    const {height, contentHeight, measuring, measured} = this.state;
    const hasKnownHeight = !measuring && (measured || collapsed);
    const style = hasKnownHeight && {
      overflow: 'hidden',
      height: height,
    };
    const contentStyle = {};
    if (measuring) {
      contentStyle.position = 'absolute';
      contentStyle.opacity = 0;
    } else if (this.props.align === 'center') {
      contentStyle.transform = [
        {
          translateY: height.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [contentHeight / -2, 0],
          }),
        },
      ];
    } else if (this.props.align === 'bottom') {
      contentStyle.transform = [
        {
          translateY: height.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [-contentHeight, 0],
          }),
        },
      ];
    }
    return (
      <Animated.View
        style={style}
        pointerEvents={!enablePointerEvents && collapsed ? 'none' : 'auto'}>
        <Animated.View
          ref={this._handleRef}
          style={[this.props.style, contentStyle]}
          onLayout={
            this.state.animating ? undefined : this._handleLayoutChange
          }>
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

Collapsible.propTypes = {
  align: PropTypes.oneOf(['top', 'center', 'bottom']),
  collapsed: PropTypes.bool,
  collapsedHeight: PropTypes.number,
  enablePointerEvents: PropTypes.bool,
  duration: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  style: ViewPropTypes.style,
  onAnimationEnd: PropTypes.func,
  children: PropTypes.node,
};

Collapsible.defaultProps = {
  align: 'top',
  collapsed: true,
  collapsedHeight: 0,
  enablePointerEvents: false,
  duration: 300,
  easing: 'easeOutCubic',
  onAnimationEnd: () => null,
};

const COLLAPSIBLE_PROPS = Object.keys(Collapsible.propTypes);
const VIEW_PROPS = Object.keys(ViewPropTypes);

export default class Accordion extends Component {
  _toggleSection(section) {
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
    let viewProps = {};
    let collapsibleProps = {};

    Object.keys(this.props).forEach(key => {
      if (COLLAPSIBLE_PROPS.includes(key)) {
        collapsibleProps[key] = this.props[key];
      } else if (VIEW_PROPS.includes(key)) {
        viewProps[key] = this.props[key];
      }
    });

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
      <Collapsible
        collapsed={!activeSections.includes(key)}
        {...collapsibleProps}
        onAnimationEnd={() => onAnimationEnd(section, key)}>
        {renderContent(section, key, activeSections.includes(key), sections)}
      </Collapsible>
    );

    return (
      <View style={containerStyle} {...viewProps}>
        {sections.map((section, key) => (
          <View key={key} style={sectionContainerStyle}>
            {renderSectionTitle(section, key, activeSections.includes(key))}

            {expandFromBottom && renderCollapsible(section, key)}

            <Touchable
              onPress={() => this._toggleSection(key)}
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

Accordion.propTypes = {
  sections: PropTypes.array.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  renderFooter: PropTypes.func,
  renderSectionTitle: PropTypes.func,
  activeSections: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  align: PropTypes.oneOf(['top', 'center', 'bottom']),
  duration: PropTypes.number,
  easing: PropTypes.string,
  underlayColor: PropTypes.string,
  touchableComponent: PropTypes.func,
  touchableProps: PropTypes.object,
  disabled: PropTypes.bool,
  expandFromBottom: PropTypes.bool,
  expandMultiple: PropTypes.bool,
  onAnimationEnd: PropTypes.func,
  sectionContainerStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
};

Accordion.defaultProps = {
  underlayColor: 'black',
  disabled: false,
  expandFromBottom: false,
  expandMultiple: false,
  touchableComponent: TouchableHighlight,
  renderSectionTitle: () => null,
  onAnimationEnd: () => null,
  sectionContainerStyle: {},
};
