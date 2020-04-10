import React, {PureComponent} from 'react';
import {View, Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import {styles, radius} from './styles';
interface IRippleProps {
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleSize?: number;
  rippleContainerBorderRadius?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleFades?: boolean;
  disabled?: boolean;
  onRippleAnimation?: (...args: any[]) => any;
  delayLongPress?: any;
  delayPressIn?: any;
  delayPressOut?: any;
  hitSlop?: any;
  pressRetentionOffset?: any;
  testID?: any;
  nativeID?: any;
  accessible?: any;
  accessibilityLabel?: any;
  onLayout?: any;
  props?: any;
  onPressOut?: any;
  onPressIn?: any;
  onLongPress?: any;
  onPress?: any;
}
type RippleState = {
  width?: number;
  height?: number;
  ripples?: undefined[];
};
export default class Ripple extends PureComponent<IRippleProps, RippleState> {
  mounted: any;
  unique: number;
  static defaultProps = {
    // @ts-ignore
    ...TouchableWithoutFeedback.defaultProps,
    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.3,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    rippleFades: true,
    disabled: false,
    onRippleAnimation: (animation: any, callback: any) =>
      animation.start(callback),
  };
  constructor(props: IRippleProps) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.renderRipple = this.renderRipple.bind(this);
    this.unique = 0;
    this.mounted = false;
    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  onLayout(event: any) {
    const {width, height} = event.nativeEvent.layout;
    const {onLayout} = this.props;
    if (typeof onLayout === 'function') {
      onLayout(event);
    }
    this.setState({width, height});
  }
  onPress(event: any) {
    const {ripples} = this.state;
    const {onPress, rippleSequential} = this.props;
    if (!rippleSequential || !ripples!.length) {
      if (typeof onPress === 'function') {
        requestAnimationFrame(() => onPress(event));
      }
      this.startRipple(event);
    }
  }
  onLongPress(event: any) {
    const {onLongPress} = this.props;
    if (typeof onLongPress === 'function') {
      requestAnimationFrame(() => onLongPress(event));
    }
    this.startRipple(event);
  }
  onPressIn(event: any) {
    const {onPressIn} = this.props;
    if (typeof onPressIn === 'function') {
      onPressIn(event);
    }
  }
  onPressOut(event: any) {
    const {onPressOut} = this.props;
    if (typeof onPressOut === 'function') {
      onPressOut(event);
    }
  }
  onAnimationEnd() {
    if (this.mounted) {
      this.setState(({ripples}) => ({ripples: ripples!.slice(1)}));
    }
  }
  startRipple(eventLocation: any) {
    const {width, height} = this.state;
    const {
      rippleDuration,
      rippleCentered,
      rippleSize,
      onRippleAnimation,
    } = this.props;
    const w2 = 0.5 * width!;
    const h2 = 0.5 * height!;
    const {locationX, locationY} = rippleCentered
      ? {locationX: w2, locationY: h2}
      : eventLocation;
    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);
    const R =
      rippleSize! > 0
        ? 0.5 * rippleSize!
        : Math.sqrt((w2 + offsetX) ** 2 + (h2 + offsetY) ** 2);
    const ripple = {
      unique: this.unique + 1,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };
    const animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });
    onRippleAnimation!(animation, this.onAnimationEnd);
    // @ts-ignore
    this.setState(({ripples}) => ({ripples: ripples!.concat(ripple)}));
  }
  renderRipple({unique, progress, locationX, locationY, R}: any) {
    const {rippleColor, rippleOpacity, rippleFades} = this.props;
    const rippleStyle = {
      top: locationY - radius,
      left: locationX - radius,
      backgroundColor: rippleColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],
      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0],
          })
        : rippleOpacity,
    };
    return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
  }
  render() {
    const {ripples} = this.state;
    const {onPress, onPressIn, onPressOut, onLongPress, onLayout} = this;
    const {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      children,
      rippleContainerBorderRadius,
      testID,
      nativeID,
      accessible,
      accessibilityLabel,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onLayout: __ignored__,
      ...props
    } = this.props;
    const touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      onPress,
      onPressIn,
      testID,
      nativeID,
      accessible,
      accessibilityLabel,
      onPressOut,
      onLongPress: props.onLongPress ? onLongPress : undefined,
      onLayout,
    };
    const containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };
    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...props} pointerEvents="box-only">
          {children}
          <View style={[styles.container, containerStyle]}>
            {ripples!.map(this.renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
