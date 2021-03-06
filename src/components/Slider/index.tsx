import React, {Component} from 'react';
import {
  Animated,
  View,
  PanResponder,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';

import Text from '../Text';
import withTheme from '../withTheme';
import {SliderConfigs} from './constants';
import SliderLayout from './SliderLayout';
import {getStyles} from './styles';

interface ISliderProps {
  theme?: any;
  valueUp: number;
  valueDown: number;
  limitUp: number;
  limitDown: number;
  step: number | undefined;
  smooth: boolean;
  size: 'regular' | 'large';
  color?: string;
  layout: 'regular' | 'labelBottom' | 'labelHidden';
  showDownButton?: boolean;
  showTooltip?: boolean;
  leftLabel?: (a: number) => any;
  rightLabel?: (b: number) => any;
  style?: ViewStyle;
  onChange: (a: number, b: number) => any;
}
interface ISliderState {
  positionUp: Animated.Value;
  positionDown: Animated.Value;
  width: number;
  topButton: 'up' | 'down';
  buttonUpTouched: Animated.Value;
  buttonDownTouched: Animated.Value;
  valueUp: number;
  valueDown: number;
}
class Slider extends Component<ISliderProps, ISliderState> {
  static defaultProps: any;
  upButtonResponder: any;
  downButtonResponder: any;
  constructor(props: ISliderProps) {
    super(props);

    this.state = {
      positionUp: new Animated.Value(0),
      positionDown: new Animated.Value(0),
      width: 1,
      topButton: 'up',
      buttonUpTouched: new Animated.Value(0),
      buttonDownTouched: new Animated.Value(0),
      valueUp: this.props.valueUp,
      valueDown: this.props.valueDown,
    };

    this.upButtonResponder = this.createUpButtonPanResponder();
    this.downButtonResponder = this.createDownButtonPanResponder();
  }

  onChange() {
    const {valueUp, valueDown} = this.getValues();
    this.setState({
      valueUp,
      valueDown,
    });
    this.props.onChange(valueUp, valueDown);
  }

  createUpButtonPanResponder() {
    let value = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        value = (this.state.positionUp as any)._value;
        this.state.positionUp.setOffset(value);
      },
      onPanResponderStart: () => {
        this.state.positionUp.setValue(0);
        this.state.buttonUpTouched.setValue(1);
      },
      onPanResponderMove: (_, gestureState) => {
        let dx = gestureState.dx;
        const positionDown = (this.state.positionDown as any).__getValue();
        const newPosition = value + gestureState.dx;

        if (newPosition >= this.state.width) {
          dx = this.state.width - value;
        } else if (newPosition <= positionDown) {
          dx = positionDown - value;
        }
        this.state.positionUp.setValue(this.getRoundedOffset(dx));
        this.onChange();
      },
      onPanResponderRelease: () => {
        value = 0;
        this.state.positionUp.flattenOffset();
        const positionUpValue = (this.state.positionUp as any).__getValue();
        const buttonWidth = SliderConfigs[this.props.size].buttonRadius * 2;
        if (positionUpValue >= this.state.width - buttonWidth) {
          this.setState({
            topButton: 'down',
          });
        }
        if (positionUpValue <= buttonWidth) {
          this.setState({
            topButton: 'up',
          });
        }
        this.state.buttonUpTouched.setValue(0);
      },
    });
  }

  createDownButtonPanResponder() {
    let value = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        value = (this.state.positionDown as any)._value;
        this.state.positionDown.setOffset(value);
      },
      onPanResponderStart: () => {
        this.state.positionDown.setValue(0);
        this.state.buttonDownTouched.setValue(1);
      },
      onPanResponderMove: (_, gestureState) => {
        let dx = gestureState.dx;
        const positionUp = (this.state.positionUp as any).__getValue();
        const newPosition = value + gestureState.dx;

        if (newPosition >= positionUp) {
          dx = positionUp - value;
        } else if (newPosition <= 0) {
          dx = -value;
        }
        this.state.positionDown.setValue(this.getRoundedOffset(dx));
        this.onChange();
      },
      onPanResponderRelease: () => {
        value = 0;
        this.state.positionDown.flattenOffset();
        const positionDownValue = (this.state.positionUp as any).__getValue();
        const buttonWidth = SliderConfigs[this.props.size].buttonRadius * 2;
        if (positionDownValue <= buttonWidth) {
          this.setState({
            topButton: 'up',
          });
        }
        if (positionDownValue >= this.state.width - buttonWidth) {
          this.setState({
            topButton: 'down',
          });
        }
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
      valueUp: this.getRoundedValue(valueUp),
      valueDown: this.getRoundedValue(valueDown),
    };
  }

  getRoundedValue(value: number) {
    if (!this.props.step) {
      return Math.round(value);
    }

    const stepCount = Math.round(value / this.props.step);
    return Math.round(stepCount * this.props.step);
  }

  getRoundedOffset(offset: number) {
    if (this.props.smooth || !this.props.step) {
      return offset;
    }
    const positionToValueRatio =
      this.state.width / (this.props.limitUp - this.props.limitDown);
    const positionStep = positionToValueRatio * this.props.step;
    const stepLeft = offset / positionStep - Math.floor(offset / positionStep);
    if (stepLeft >= 0.5 || stepLeft <= -0.5) {
      return Math.ceil(offset / positionStep) * positionStep;
    }

    return Math.floor(offset / positionStep) * positionStep;
  }

  onRangeBarContainerLayout = ({nativeEvent}: LayoutChangeEvent) => {
    const width = Math.round(
      nativeEvent.layout.width -
        SliderConfigs[this.props.size].buttonRadius * 2,
    );
    const positionToValueRatio =
      width / (this.props.limitUp - this.props.limitDown);

    this.state.positionUp.setValue(
      (this.props.valueUp - this.props.limitDown) * positionToValueRatio,
    );
    this.state.positionDown.setValue(
      (this.props.valueDown - this.props.limitDown) * positionToValueRatio,
    );
    this.setState({
      width,
    });
  };

  renderRangeBar() {
    const styles = getStyles({
      theme: this.props.theme,
      size: this.props.size,
      color: this.props.color,
    });

    return (
      <>
        <View
          style={styles.rangeBarWrapper}
          onLayout={this.onRangeBarContainerLayout}>
          <Animated.View
            style={[
              styles.rangeBar,
              {
                marginLeft: this.state.positionDown,
                marginRight: this.state.positionUp.interpolate({
                  inputRange: [0, 1, this.state.width],
                  outputRange: [this.state.width, this.state.width - 1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        </View>
        {this.props.showDownButton && (
          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                transform: [
                  {
                    translateX: this.state.positionDown,
                  },
                ],
              },
              this.state.topButton === 'down' ? styles.topButton : {},
            ]}
            {...this.downButtonResponder.panHandlers}>
            {this.props.showTooltip && (
              <Animated.View
                style={[
                  styles.buttonTooltip,
                  {opacity: this.state.buttonDownTouched},
                ]}>
                <Text style={styles.buttonTooltipText}>
                  {this.state.valueDown}
                </Text>
                <View style={styles.tooltipArrow} />
              </Animated.View>
            )}
            <Animated.View
              style={[
                styles.buttonPulsarWrapper,
                {opacity: this.state.buttonDownTouched},
              ]}>
              <View style={styles.buttonPulsar} />
            </Animated.View>
            <View style={styles.button} />
          </Animated.View>
        )}
        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              transform: [
                {
                  translateX: this.state.positionUp,
                },
              ],
            },
            this.state.topButton === 'up' ? styles.topButton : {},
          ]}
          {...this.upButtonResponder.panHandlers}>
          {this.props.showTooltip && (
            <Animated.View
              style={[
                styles.buttonTooltip,
                {opacity: this.state.buttonUpTouched},
              ]}>
              <Text style={styles.buttonTooltipText}>{this.state.valueUp}</Text>
              <View style={styles.tooltipArrow} />
            </Animated.View>
          )}
          <Animated.View
            style={[
              styles.buttonPulsarWrapper,
              {opacity: this.state.buttonUpTouched},
            ]}>
            <View style={styles.buttonPulsar} />
          </Animated.View>
          <View style={styles.button} />
        </Animated.View>
      </>
    );
  }

  render() {
    const styles = getStyles({
      theme: this.props.theme,
      size: this.props.size,
      color: this.props.color,
    });

    return (
      <SliderLayout
        type={this.props.layout}
        wrapperStyle={this.props.style}
        styles={styles}
        leftLabel={
          typeof this.props.leftLabel === 'function' ? (
            this.props.leftLabel(this.props.limitDown)
          ) : (
            <Text style={styles.labelText}>{this.props.limitDown}</Text>
          )
        }
        rightLabel={
          typeof this.props.rightLabel === 'function' ? (
            this.props.rightLabel(this.props.limitUp)
          ) : (
            <Text style={styles.labelText}>{this.props.limitUp}</Text>
          )
        }
        rangeBar={this.renderRangeBar()}
      />
    );
  }
}
Slider.defaultProps = {
  limitUp: 9,
  limitDown: 0,
  step: 1,
  valueUp: 1,
  valueDown: 0,
  size: 'regular',
  layout: 'regular',
  smooth: true,
  showDownButton: false,
  showTooltip: true,
  onChange: () => {},
};

export default withTheme(Slider);
