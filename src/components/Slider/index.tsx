import React, {Component} from 'react';
import {Animated, View, PanResponder, LayoutChangeEvent} from 'react-native';
import Text from '../Text';
import withTheme from '../withTheme';
import {SliderConfigs} from './constants';
import {getStyles} from './styles';

interface ISliderProps {
  theme?: any;
  valueUp: number;
  valueDown: number;
  limitUp: number;
  limitDown: number;
  step: number | undefined;
  size: 'regular' | 'large';
  color?: string;
  leftLabel?: () => any;
  rightLabel?: () => any;
  onChange: (a: number, b: number) => any;
}
interface ISliderState {
  positionUp: Animated.Value;
  positionDown: Animated.Value;
  width: number;
  buttonUpTouched: Animated.Value;
  buttonDownTouched: Animated.Value;
}
class Slider extends Component<ISliderProps, ISliderState> {
  static defaultProps: any;
  upButtonResponder: any;
  downButtonResponder: any;
  isUpResponderActive: boolean = false;
  isDownResponderActive: boolean = false;
  constructor(props: ISliderProps) {
    super(props);

    this.state = {
      positionUp: new Animated.Value(0),
      positionDown: new Animated.Value(0),
      width: 100,
      buttonUpTouched: new Animated.Value(0),
      buttonDownTouched: new Animated.Value(0),
    };

    this.upButtonResponder = this.createUpButtonPanResponder();
    this.downButtonResponder = this.createDownButtonPanResponder();
  }

  onChange() {
    const valueUp = (this.state.positionUp.interpolate({
      inputRange: [0, this.state.width],
      outputRange: [this.props.limitDown, this.props.limitUp],
      extrapolate: 'clamp',
    }) as any).__getValue();
    const valueDown = (this.state.positionDown.interpolate({
      inputRange: [0, this.state.width],
      outputRange: [this.props.limitDown, this.props.limitUp],
      extrapolate: 'clamp',
    }) as any).__getValue();
    this.props.onChange(
      this.getRoundedValue(valueUp),
      this.getRoundedValue(valueDown),
    );
  }

  createUpButtonPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.positionUp.setOffset((this.state.positionUp as any)._value);
      },
      onPanResponderStart: () => {
        this.state.buttonUpTouched.setValue(1);
      },
      onPanResponderMove: (_, gestureState) => {
        this.state.positionUp.setValue(gestureState.dx);
        this.onChange();
      },
      onPanResponderRelease: () => {
        this.state.positionUp.flattenOffset();
        this.state.buttonUpTouched.setValue(0);
      },
    });
  }

  createDownButtonPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.positionDown.setOffset(
          (this.state.positionDown as any)._value,
        );
      },
      onPanResponderStart: () => {
        this.state.buttonDownTouched.setValue(1);
      },
      onPanResponderMove: (_, gestureState) => {
        this.state.positionDown.setValue(gestureState.dx);
        this.onChange();
      },
      onPanResponderRelease: () => {
        this.state.positionDown.flattenOffset();
        this.state.buttonDownTouched.setValue(0);
      },
    });
  }

  getValues() {
    const valueUp = (this.state.positionUp.interpolate({
      inputRange: [0, this.state.width],
      outputRange: [this.props.limitDown, this.props.limitUp],
      extrapolate: 'clamp',
    }) as any).__getValue();
    const valueDown = (this.state.positionDown.interpolate({
      inputRange: [0, this.state.width],
      outputRange: [this.props.limitDown, this.props.limitUp],
      extrapolate: 'clamp',
    }) as any).__getValue();
    return {
      up: this.getRoundedValue(valueUp),
      down: this.getRoundedValue(valueDown),
    };
  }

  getRoundedValue(value: number) {
    if (!this.props.step) {
      return value;
    }
    const countSteps = Math.round(
      (value - this.props.limitDown) / this.props.step,
    );
    return countSteps * this.props.step;
  }

  onRangeBarContainerLayout = ({nativeEvent}: LayoutChangeEvent) => {
    const width =
      nativeEvent.layout.width -
      SliderConfigs[this.props.size].buttonRadius * 2;
    this.setState({
      width,
    });

    this.state.positionUp.setValue(
      this.props.valueUp * (width / this.props.limitUp),
    );
    this.state.positionDown.setValue(
      this.props.valueDown * (width / this.props.limitUp),
    );
  };

  render() {
    const styles = getStyles({
      theme: this.props.theme,
      size: this.props.size,
      color: this.props.color,
    });
    const positionDownValue = (this.state.positionDown as any).__getValue();
    const translateUp = this.state.positionUp.interpolate({
      inputRange: [0, positionDownValue, this.state.width],
      outputRange: [positionDownValue, positionDownValue, this.state.width],
      extrapolate: 'clamp',
    });
    const translateUpValue = (translateUp as any).__getValue();
    const values = this.getValues();

    return (
      <>
        <View style={styles.container}>
          <View style={styles.leftSideContainer}>
            {typeof this.props.leftLabel === 'function' ? (
              this.props.leftLabel()
            ) : (
              <Text style={styles.labelText}>{this.props.limitDown}</Text>
            )}
          </View>
          <View style={styles.centralContainer}>
            <View
              style={styles.rangeBarContainer}
              onLayout={this.onRangeBarContainerLayout}>
              <Animated.View
                style={[
                  styles.rangeBar,
                  {
                    marginRight: this.state.positionUp.interpolate({
                      inputRange: [0, this.state.width],
                      outputRange: [this.state.width, 0],
                      extrapolate: 'clamp',
                    }),
                    marginLeft: this.state.positionDown.interpolate({
                      inputRange: [0, this.state.width],
                      outputRange: [0, this.state.width],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              />
            </View>
            {!!this.props.valueDown && (
              <Animated.View
                style={[
                  styles.buttonWrapper,
                  {
                    transform: [
                      {
                        translateX: this.state.positionDown.interpolate({
                          inputRange: [0, translateUpValue, this.state.width],
                          outputRange: [0, translateUpValue, translateUpValue],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}
                {...this.downButtonResponder.panHandlers}>
                <Animated.View
                  style={[
                    styles.buttonTooltip,
                    {opacity: this.state.buttonDownTouched},
                  ]}>
                  <Text animated style={styles.buttonTooltipText}>
                    {values.down}
                  </Text>
                </Animated.View>
                {
                  <Animated.View
                    style={[
                      styles.buttonPulsarWrapper,
                      {opacity: this.state.buttonDownTouched},
                    ]}>
                    <View style={styles.buttonPulsar} />
                  </Animated.View>
                }
                <View style={styles.button} />
              </Animated.View>
            )}
            <Animated.View
              style={[
                styles.buttonWrapper,
                {
                  transform: [
                    {
                      translateX: translateUp,
                    },
                  ],
                },
              ]}
              {...this.upButtonResponder.panHandlers}>
              <Animated.View
                style={[
                  styles.buttonTooltip,
                  {opacity: this.state.buttonUpTouched},
                ]}>
                <Text animated style={styles.buttonTooltipText}>
                  {values.up}
                </Text>
                <View style={styles.tooltipArrow} />
              </Animated.View>
              {
                <Animated.View
                  style={[
                    styles.buttonPulsarWrapper,
                    {opacity: this.state.buttonUpTouched},
                  ]}>
                  <View style={styles.buttonPulsar} />
                </Animated.View>
              }
              <View style={styles.button} />
            </Animated.View>
          </View>
          <View style={styles.rightSideContainer}>
            {typeof this.props.rightLabel === 'function' ? (
              this.props.rightLabel()
            ) : (
              <Text style={styles.labelText}>{this.props.limitUp}</Text>
            )}
          </View>
        </View>
      </>
    );
  }
}
Slider.defaultProps = {
  limitUp: 10,
  limitDown: 0,
  step: 1,
  valueUp: 5,
  valueDown: 0,
  size: 'regular',
  onChange: () => {},
};

export default withTheme(Slider);
