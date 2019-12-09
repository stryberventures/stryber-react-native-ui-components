import React, {Component} from 'react';
import {Animated, Easing, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

export default class Collapse extends Component {
  state = {
    measuring: false,
    measured: false,
    height: new Animated.Value(this.props.collapsedHeight),
    contentHeight: 0,
    animating: false,
  };

  contentHandle = React.createRef();

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.setState({measured: false}, () => this.updateProps(prevProps));
    } else {
      this.updateProps(prevProps);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  updateProps(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.toggle(this.props.collapsed);
    } else if (
      this.props.collapsed &&
      prevProps.collapsedHeight !== this.props.collapsedHeight
    ) {
      this.state.height.setValue(this.props.collapsedHeight);
    }
  }

  measure(callback) {
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
            this.contentHandle.current
              .getNode()
              .measure((x, y, width, height) => {
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

  toggle(collapsed) {
    if (collapsed) {
      this.transitionToHeight(this.props.collapsedHeight);
    } else if (!this.contentHandle) {
      if (this.state.measured) {
        this.transitionToHeight(this.state.contentHeight);
      }
    } else {
      this.measure(contentHeight => {
        this.transitionToHeight(contentHeight);
      });
    }
  }

  transitionToHeight(height) {
    const {duration} = this.props;
    const animations = ['easeInOut', 'easeOut', 'easeIn'];

    let easing = this.props.easing;
    if (typeof easing === 'string') {
      let prefix;
      let found = false;
      for (let i = 0; i < animations.length; i++) {
        prefix = animations[i];
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
        throw new Error(`Invalid easing type ${this.props.easing}`);
      }
    }

    if (this.animation) {
      this.animation.stop();
    }
    this.setState({animating: true});
    this.animation = Animated.timing(this.state.height, {
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

  onLayoutChange = event => {
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
          ref={this.contentHandle}
          style={[this.props.style, contentStyle]}
          onLayout={this.state.animating ? undefined : this.onLayoutChange}>
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

Collapse.defaultProps = {
  align: 'top',
  collapsed: true,
  collapsedHeight: 0,
  enablePointerEvents: false,
  duration: 300,
  easing: 'easeOutCubic',
  onAnimationEnd: () => null,
  style: {},
};

Collapse.propTypes = {
  align: PropTypes.oneOf(['top', 'center', 'bottom']),
  collapsed: PropTypes.bool,
  collapsedHeight: PropTypes.number,
  enablePointerEvents: PropTypes.bool,
  duration: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  style: ViewPropTypes.style,
  onAnimationEnd: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
