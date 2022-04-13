import React, {forwardRef, useRef, useState} from 'react';
import {Animated, Easing, View} from 'react-native';

import InputBase, {IInputBaseProps} from '../InputBase';
import Block from '../../Block';
import {getStyles} from './styles';
import {useTheme} from '../../Theme';

export interface IInputLinedProps extends Omit<IInputBaseProps, 'theme'> {
  name?: string;
  type?: 'email' | 'phone' | 'number' | 'default';
  label?: string;
  error?: string;
  required?: boolean;

  // native input props
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number; // how to be with multiline ?
  numberOfLines?: number;
  maxNumberOfLines?: number;
  onFocus?: () => void;
  onBlur?: () => void;

  color?: string;

  // specific props
  icon?: () => any;
  rightIcon?: () => any;
  iconBackground?: boolean;
}

const InputLined = forwardRef<InputBase, IInputLinedProps>(
  (
    {
      label,
      required,
      disabled,
      error,
      value,
      color,
      multiline,
      icon,
      iconBackground,
      rightIcon,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const {theme} = useTheme();
    const isValueInside = value && label;
    const [moveLabel, setMoveLabel] = useState(!!isValueInside);
    const styles = getStyles({
      theme,
      color,
      disabled,
      error: !!error,
      moveLabel,
    });
    const labelFadeInAnimation = useRef(
      new Animated.Value(moveLabel ? 1 : 0),
    ).current;

    const getLabelFadeInInterpolation = (...args: [number, number]) =>
      labelFadeInAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: args,
      });

    const animateLabel = () => {
      if (!label) {
        return;
      }
      if (!moveLabel) {
        Animated.timing(labelFadeInAnimation, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }
      setMoveLabel(true);
    };

    const renderLabel = () => {
      return (
        <Animated.View
          shouldRasterizeIOS
          renderToHardwareTextureAndroid
          style={[
            styles.label,
            {
              top: getLabelFadeInInterpolation(0, 3),
              opacity: labelFadeInAnimation,
            },
          ]}>
          <Animated.Text
            style={[
              styles.labelText,
              styles.labelAnimatedText,
              {fontSize: getLabelFadeInInterpolation(14, 12)},
              error ? styles.labelAnimatedTextError : {},
            ]}>
            {`${label} ${required ? '*' : ''}`}
          </Animated.Text>
        </Animated.View>
      );
    };

    return (
      <InputBase
        {...rest}
        ref={ref}
        error={error}
        theme={theme}
        disabled={disabled!}
        value={value}
        multiline={multiline}
        inputWrapperComponent={({children, style}: any) => {
          return (
            <Block style={style}>
              <Block
                animated
                style={[
                  {
                    transform: [
                      {
                        translateY: getLabelFadeInInterpolation(0, 7),
                      },
                    ],
                  },
                  styles.textInput,
                ]}>
                {children}
              </Block>
              {!!label && renderLabel()}
            </Block>
          );
        }}
        renderInputLeft={() => (
          <>
            {!icon!() && <View style={styles.leftBorder} />}
            {!!icon!() && iconBackground && (
              <View style={[styles.leftBlock, styles.leftBlockWithRotated]}>
                <View style={styles.additionalLeftBlock} />
                <View style={styles.rotatedBlock} />
                <View style={styles.iconContainer}>{icon!()}</View>
              </View>
            )}
            {!!icon!() && !iconBackground && (
              <View
                style={[
                  styles.leftBlock,
                  styles.leftBlockWithNoIconBackground,
                ]}>
                <View style={styles.iconContainer}>{icon!()}</View>
              </View>
            )}
          </>
        )}
        renderInputRight={() => (
          <>
            {!!rightIcon && (
              <View style={styles.rightIconContainer}>{rightIcon()}</View>
            )}
          </>
        )}
        onFocus={() => {
          animateLabel();
          onFocus!();
        }}
        onBlur={() => {
          animateLabel();
          onBlur!();
        }}
      />
    );
  },
);

InputLined.defaultProps = {
  name: '',
  type: 'default',
  label: '',
  disabled: false,
  required: false,
  placeholder: '',
  multiline: false,
  maxLength: 45, // max length for text area ?
  icon: () => {},
  iconBackground: true,
  onFocus: () => {},
  onBlur: () => {},
};

export default InputLined;
