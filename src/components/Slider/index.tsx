import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  View,
  PanResponder,
  LayoutChangeEvent,
  ViewStyle,
  StyleProp,
  PanResponderInstance,
} from 'react-native';

import Text from '../Text';
import {SliderConfigs} from './constants';
import SliderLayout from './SliderLayout';
import {getStyles} from './styles';
import {useTheme} from '../Theme';

interface ISliderProps {
  valueUp: number;
  valueDown?: number;
  limitUp: number;
  limitDown?: number;
  step?: number | undefined;
  smooth?: boolean;
  size?: 'regular' | 'large';
  color?: string;
  layout?: 'regular' | 'labelBottom' | 'labelHidden';
  showDownButton?: boolean;
  showTooltip?: boolean;
  leftLabel?: (a: number) => any;
  rightLabel?: (b: number) => any;
  style?: StyleProp<ViewStyle>;
  onChange?: (a: number, b: number) => any;
}

//TODO: reduce and simplify code

const Slider: FC<ISliderProps> = ({
  valueUp: initialValueUp = 1,
  valueDown: initialValueDown = 0,
  step = 1,
  limitDown = 0,
  limitUp = 9,
  onChange = () => {},
  size = 'regular',
  smooth = true,
  color,
  showDownButton = false,
  showTooltip = true,
  rightLabel,
  leftLabel,
  layout = 'regular',
  style,
}) => {
  const {theme} = useTheme();
  const [width, setWidth] = useState(1);
  const [topButton, setTopButton] = useState('up');
  const [valueUp, setValueUp] = useState(initialValueUp);
  const [valueDown, setValueDown] = useState(initialValueDown);
  const [upButtonPanResponder, setUpButtonPanResponder] =
    useState<PanResponderInstance | null>(null);
  const [downButtonPanResponder, setDownButtonPanResponder] =
    useState<PanResponderInstance | null>(null);

  const positionUp = useRef(new Animated.Value(0)).current;
  const positionDown = useRef(new Animated.Value(0)).current;
  const buttonUpTouched = useRef(new Animated.Value(0)).current;
  const buttonDownTouched = useRef(new Animated.Value(0)).current;

  const styles = getStyles({
    theme,
    size,
    color,
  });

  useEffect(() => {
    setUpButtonPanResponder(createUpButtonPanResponder());
    setDownButtonPanResponder(createDownButtonPanResponder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const getRoundedValue = (value: number) => {
    if (step) {
      return Math.round(value);
    }
    const stepCount = Math.round(value / step!);
    return Math.round(stepCount * step!);
  };

  const getValues = () => {
    const interpolatedValueUp = (
      positionUp.interpolate({
        inputRange: [0, width],
        outputRange: [limitDown, limitUp],
        extrapolate: 'clamp',
      }) as any
    ).__getValue();
    const interpolatedValueDown = (
      positionDown.interpolate({
        inputRange: [0, width],
        outputRange: [limitDown, limitUp],
        extrapolate: 'clamp',
      }) as any
    ).__getValue();
    return {
      interpolatedValueUp: getRoundedValue(interpolatedValueUp),
      interpolatedValueDown: getRoundedValue(interpolatedValueDown),
    };
  };

  const onSliderChange = () => {
    const {interpolatedValueUp, interpolatedValueDown} = getValues();
    setValueUp(interpolatedValueUp);
    setValueDown(interpolatedValueDown);
    onChange(interpolatedValueUp, interpolatedValueDown);
  };

  const getRoundedOffset = (offset: number) => {
    if (smooth || !step) {
      return offset;
    }
    const positionToValueRatio = width / (limitUp - limitDown);
    const positionStep = positionToValueRatio * step!;
    const stepLeft = offset / positionStep - Math.floor(offset / positionStep);
    if (stepLeft >= 0.5 || stepLeft <= -0.5) {
      return Math.ceil(offset / positionStep) * positionStep;
    }

    return Math.floor(offset / positionStep) * positionStep;
  };

  const createUpButtonPanResponder = () => {
    let value = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        value = (positionUp as any)._value;
        positionUp.setOffset(value);
      },
      onPanResponderStart: () => {
        positionUp.setValue(0);
        buttonUpTouched.setValue(1);
      },
      onPanResponderMove: (_, gestureState) => {
        let dx = gestureState.dx;
        const positionDownValue = (positionDown as any).__getValue();
        const newPosition = value + gestureState.dx;

        if (newPosition >= width) {
          dx = width - value;
        } else if (newPosition <= positionDownValue) {
          dx = positionDownValue - value;
        }
        positionUp.setValue(getRoundedOffset(dx));
        onSliderChange();
      },
      onPanResponderRelease: () => {
        value = 0;
        positionUp.flattenOffset();
        const positionUpValue = (positionUp as any).__getValue();
        const buttonWidth = SliderConfigs[size].buttonRadius * 2;
        if (positionUpValue >= width - buttonWidth) {
          setTopButton('down');
        }
        if (positionUpValue <= buttonWidth) {
          setTopButton('up');
        }
        buttonUpTouched.setValue(0);
      },
    });
  };

  const createDownButtonPanResponder = () => {
    let value = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        value = (positionDown as any)._value;
        positionDown.setOffset(value);
      },
      onPanResponderStart: () => {
        positionDown.setValue(0);
        buttonDownTouched.setValue(1);
      },
      onPanResponderMove: (_, gestureState) => {
        let dx = gestureState.dx;
        const positionUpValue = (positionUp as any).__getValue();
        const newPosition = value + gestureState.dx;

        if (newPosition >= positionUpValue) {
          dx = positionUpValue - value;
        } else if (newPosition <= 0) {
          dx = -value;
        }
        positionDown.setValue(getRoundedOffset(dx));
        onSliderChange();
      },
      onPanResponderRelease: () => {
        value = 0;
        positionDown.flattenOffset();
        const positionDownValue = (positionUp as any).__getValue();
        const buttonWidth = SliderConfigs[size].buttonRadius * 2;
        if (positionDownValue <= buttonWidth) {
          setTopButton('up');
        }
        if (positionDownValue >= width - buttonWidth) {
          setTopButton('down');
        }
        buttonDownTouched.setValue(0);
      },
    });
  };

  const onRangeBarContainerLayout = ({nativeEvent}: LayoutChangeEvent) => {
    const newWidth = Math.round(
      nativeEvent.layout.width - SliderConfigs[size].buttonRadius * 2,
    );
    const positionToValueRatio = newWidth / (limitUp - limitDown);

    positionUp.setValue((initialValueUp - limitDown) * positionToValueRatio);
    positionDown.setValue(
      (initialValueDown - limitDown) * positionToValueRatio,
    );
    setWidth(newWidth);
  };

  const renderRangeBar = () => (
    <>
      <View style={styles.rangeBarWrapper} onLayout={onRangeBarContainerLayout}>
        <Animated.View
          style={[
            styles.rangeBar,
            {
              marginLeft: positionDown,
              marginRight: positionUp.interpolate({
                inputRange: [0, 1, width],
                outputRange: [width, width - 1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
      </View>
      {showDownButton && (
        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              transform: [
                {
                  translateX: positionDown,
                },
              ],
            },
            topButton === 'down' ? styles.topButton : {},
          ]}
          {...downButtonPanResponder?.panHandlers}>
          {showTooltip && (
            <Animated.View
              style={[styles.buttonTooltip, {opacity: buttonDownTouched}]}>
              <Text style={styles.buttonTooltipText}>{valueDown}</Text>
              <View style={styles.tooltipArrow} />
            </Animated.View>
          )}
          <Animated.View
            style={[styles.buttonPulsarWrapper, {opacity: buttonDownTouched}]}>
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
                translateX: positionUp,
              },
            ],
          },
          topButton === 'up' ? styles.topButton : {},
        ]}
        {...upButtonPanResponder?.panHandlers}>
        {showTooltip && (
          <Animated.View
            style={[styles.buttonTooltip, {opacity: buttonUpTouched}]}>
            <Text style={styles.buttonTooltipText}>{valueUp}</Text>
            <View style={styles.tooltipArrow} />
          </Animated.View>
        )}
        <Animated.View
          style={[styles.buttonPulsarWrapper, {opacity: buttonUpTouched}]}>
          <View style={styles.buttonPulsar} />
        </Animated.View>
        <View style={styles.button} />
      </Animated.View>
    </>
  );

  return (
    <SliderLayout
      type={layout}
      wrapperStyle={style}
      styles={styles}
      leftLabel={
        typeof leftLabel === 'function' ? (
          leftLabel(limitDown)
        ) : (
          <Text style={styles.labelText}>{limitDown}</Text>
        )
      }
      rightLabel={
        typeof rightLabel === 'function' ? (
          rightLabel(limitUp)
        ) : (
          <Text style={styles.labelText}>{limitUp}</Text>
        )
      }
      rangeBar={renderRangeBar()}
    />
  );
};

export default Slider;
