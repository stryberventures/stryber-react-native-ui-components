import React, {Component} from 'react';
import {Animated, TouchableOpacity, ViewPropTypes} from 'react-native';
import withTheme from '../withTheme';
import styles from './styles';
import Text from '../Text';
interface ISwitchProps extends React.HTMLAttributes<Element> {
  name?: string;
  value?: boolean;
  onPress?: (...args: any[]) => any;
  containerStyle?: any;
  circleStyle?: any;
  circleColorOff?: string;
  circleColorOn?: string;
  duration?: number;
  type?: 0 | 1;
  style?: any;
  buttonContainerStyle?: any;
  text?: string;
  theme: {};
  backgroundColorOff?: string;
  backgroundColorOn?: string;
  padding?: any;
  width?: any;
}
type SwitchState = {
  circlePosXStart?: number;
  circlePosXEnd?: number;
  checked?: any;
  animXValue?: any;
  start?: any;
};
class Switch extends Component<ISwitchProps, SwitchState> {
  static defaultProps: any;
  constructor(props) {
    super(props);
    const endPos =
      this.props.containerStyle.width -
      (this.props.circleStyle.width + this.props.containerStyle.padding * 2);
    this.state = {
      circlePosXStart: this.getStart(),
      circlePosXEnd: endPos,
      checked: this.props.value || false,
      animXValue: new Animated.Value(this.props.value ? 1 : 0),
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.checked !== this.state.checked) {
      this.runAnimation();
    }
  }
  getValue = () => this.state.checked;
  onPress = () => {
    const {onPress, name} = this.props;
    this.setState(
      prevState => ({checked: !prevState.checked}),
      () => onPress(this.state.checked, name),
    );
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
    const {
      theme,
      containerStyle,
      backgroundColorOff,
      backgroundColorOn,
      style,
    } = this.props;
    const {checked} = this.state;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={0.5}
        style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
        <Animated.View
          style={[
            styles.container,
            containerStyle,
            {
              backgroundColor: this.state.animXValue.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  backgroundColorOff || theme.colors.gray,
                  backgroundColorOn || theme.colors.primary,
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
  value: false,
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
  name: 'switch',
  style: {},
  buttonContainerStyle: {},
  type: 0,
};
export default withTheme(Switch);
