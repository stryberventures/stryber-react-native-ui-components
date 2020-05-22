import React, {Component} from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import withTheme from '../withTheme';
import {SwitchConfigs} from './constants';
import {getStyles} from './styles';
import Text from '../Text';

export interface ISwitchProps {
  name?: string;
  value?: boolean;
  onPress?: (...args: any[]) => any;
  circleStyle?: any;
  circleColorOff?: string;
  circleColorOn?: string;
  duration?: number;
  type?: 0 | 1;
  style?: any;
  buttonContainerStyle?: any;
  text?: string;
  theme?: any;
  backgroundColorOff?: string;
  backgroundColorOn?: string;
  size?: 'regular' | 'large';
  error?: string;
  disabled?: boolean;
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
  config: any;
  constructor(props: ISwitchProps) {
    super(props);
    this.config = SwitchConfigs[this.props.size!] || SwitchConfigs.regular;

    const endPos =
      this.config.width - (this.config.circleRadius + this.config.padding * 2);
    this.state = {
      circlePosXStart: this.getStart(),
      circlePosXEnd: endPos,
      checked: this.props.value || false,
      animXValue: new Animated.Value(this.props.value ? 1 : 0),
    };
  }
  componentDidUpdate(_: any, prevState: SwitchState, __: any) {
    if (prevState.checked !== this.state.checked) {
      this.runAnimation();
    }
  }
  getValue = () => this.state.checked;
  onPress = () => {
    const {onPress, name} = this.props;
    this.setState(
      prevState => ({checked: !prevState.checked}),
      () => onPress!(this.state.checked, name),
    );
  };
  getStart = () => {
    return this.props.type === undefined
      ? 0
      : this.props.type === 0
      ? 0
      : this.config.padding * 2;
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
      backgroundColorOff,
      backgroundColorOn,
      size,
      style,
      error,
      disabled,
    } = this.props;
    const styles = getStyles({
      theme,
      size,
    });
    const {checked} = this.state;
    return (
      <>
        <TouchableOpacity
          onPress={this.onPress}
          activeOpacity={0.5}
          disabled={disabled}
          style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
          <Animated.View
            style={[
              styles.container,
              ...(disabled
                ? [styles.containerDisabled]
                : [
                    {
                      backgroundColor: this.state.animXValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          backgroundColorOff || theme.colors.gray15,
                          (error && styles.containerError.backgroundColor) ||
                            backgroundColorOn ||
                            theme.colors.primary,
                        ],
                      }),
                    },
                  ]),
            ]}>
            <Animated.View
              style={[
                styles.circle,
                ...(disabled
                  ? [
                      {
                        backgroundColor: this.state.animXValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            this.props.circleColorOff,
                            this.props.circleColorOn,
                          ],
                        }),
                      },
                    ]
                  : []),
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
              ...styles.text,
              color: error
                ? checked
                  ? theme.colors.accent2
                  : theme.colors.accent2
                : disabled
                ? checked
                  ? theme.colors.gray15
                  : theme.colors.gray15
                : checked
                ? theme.colors.black
                : theme.colors.gray15,
            }}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
        {this.props.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.props.error}</Text>
          </View>
        )}
      </>
    );
  }
}
Switch.defaultProps = {
  value: false,
  onPress: () => {},
  circleColorOff: 'white',
  circleColorOn: 'white',
  duration: 300,
  text: '❤️ Stryber',
  name: 'switch',
  style: {},
  buttonContainerStyle: {},
  type: 0,
  size: 'regular',
  disabled: false,
};
export default withTheme(Switch);
