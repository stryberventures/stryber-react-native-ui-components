import React, {Component} from 'react';
import {Animated, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import withTheme from '../withTheme';
import styles from './styles';
import Text from '../Text';

class Switch extends Component {
  constructor(props) {
    super(props);
    const endPos =
      this.props.containerStyle.width -
      (this.props.circleStyle.width + this.props.containerStyle.padding * 2);
    this.state = {
      circlePosXStart: this.getStart(),
      circlePosXEnd: endPos,
      checked: this.props.isChecked || false,
      animXValue: new Animated.Value(this.props.isChecked ? 1 : 0),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.checked !== this.state.checked) {
      this.runAnimation();
    }
  }

  onPress = () => {
    this.props.onPress();
    this.setState(prevState => ({checked: !prevState.checked}));
  };

  getStart = () => {
    return this.props.type === undefined
      ? 0
      : this.props.type === 0
      ? 0
      : this.props.containerStyle.padding * 2;
  };

  runAnimation = () => {
    const animValue = {
      fromValue: this.state.checked ? 0 : 1,
      toValue: this.state.checked ? 1 : 0,
      duration: this.props.duration,
    };
    Animated.timing(this.state.animXValue, animValue).start();
  };

  render() {
    const {theme} = this.props;
    const {checked} = this.state;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={0.5}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Animated.View
          style={[
            styles.container,
            this.props.containerStyle,
            {
              backgroundColor: this.state.animXValue.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  this.props.backgroundColorOff || theme.colors.gray,
                  this.props.backgroundColorOn || theme.colors.primary,
                ],
              }),
            },
          ]}>
          <Animated.View
            style={[
              this.props.circleStyle,
              {
                backgroundColor: this.state.animXValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    this.props.circleColorOff,
                    this.props.circleColorOn,
                  ],
                }),
              },
              {
                transform: [
                  {
                    translateX: this.state.animXValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        this.state.circlePosXStart,
                        this.state.circlePosXEnd,
                      ],
                    }),
                  },
                ],
              },
              this.props.buttonStyle,
            ]}>
            <Animated.View style={this.props.buttonContainerStyle} />
          </Animated.View>
        </Animated.View>
        <Text
          style={{
            marginLeft: 10,
            color: checked ? theme.colors.primary : theme.colors.darkGrey,
            fontSize: theme.sizes.base - 1,
          }}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

Switch.defaultProps = {
  isChecked: false,
  onPress: () => {},
  containerStyle: {
    width: 36,
    height: 22,
    borderRadius: 18,
    backgroundColor: 'rgb(227,227,227)',
    padding: 3,
  },
  circleStyle: {
    width: 18,
    height: 18,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  circleColorOff: 'white',
  circleColorOn: 'white',
  duration: 300,
  text: '❤️ Stryber',
};

Switch.propTypes = {
  isChecked: PropTypes.bool,
  onPress: PropTypes.func,
  containerStyle: PropTypes.any,
  circleStyle: PropTypes.any,
  backgroundColorOff: PropTypes.string,
  backgroundColorOn: PropTypes.string,
  circleColorOff: PropTypes.string,
  circleColorOn: PropTypes.string,
  duration: PropTypes.number,
  type: PropTypes.number,

  buttonStyle: PropTypes.any,
  buttonContainerStyle: PropTypes.any,
  rightContainerStyle: PropTypes.any,
  leftContainerStyle: PropTypes.any,

  text: PropTypes.string,
};

export default withTheme(Switch);
