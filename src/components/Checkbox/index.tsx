import React, {FC, useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {Check} from '../Icons';
import Text from '../Text';
import Block from '../Block';
import getStyles from './styles';
import {useTheme} from '../Theme';

export interface ICheckboxProps extends Omit<TouchableOpacityProps, 'onPress'> {
  tickColor?: string;
  text?: string | React.ReactElement;
  value?: boolean;
  name?: string;
  opacity?: number;
  onPress?: (checked: boolean, name: string) => void;
  radio?: boolean;
  iconComponent?: any;
  shouldCheckboxChange?: boolean;
  style?: StyleProp<ViewStyle>;
  error?: string | boolean;
  disabled?: boolean;
  size?: 'regular' | 'large';
  bgColor?: string;
  textClickable?: boolean;
  testID?: any;
}

export type CheckboxState = {
  checked?: any;
  springValue?: any;
};

const Checkbox: FC<ICheckboxProps> = ({
  text,
  opacity,
  value,
  radio,
  error,
  disabled,
  size,
  bgColor,
  style,
  textClickable,
  onPress,
  name,
  shouldCheckboxChange,
  testID,
  iconComponent,
  tickColor,
}) => {
  const {theme} = useTheme();
  const [checked, setChecked] = useState(value || false);
  const springValueRef = useRef(new Animated.Value(1));
  const styles = getStyles({
    theme,
    checked,
    radio,
    error: !!error,
    disabled,
    size,
    bgColor,
  });
  const checkboxSizes =
    theme.sizes.checkbox[size!] || theme.sizes.checkbox.regular;

  const setCheckboxChecked = () => {
    onPress && onPress(!checked, name!);
    setChecked(checkedVal => !checkedVal);
  };

  const spring = () => {
    setCheckboxChecked();
    springValueRef.current.setValue(0.7);

    Animated.spring(springValueRef.current, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const onCheckboxPress = () => {
    shouldCheckboxChange && spring();
  };

  const renderRadioIcon = () => <Block style={styles.radioIcon} flex={0} />;

  const renderControl = () => (
    <TouchableOpacity
      testID={testID}
      disabled={textClickable}
      onPress={onCheckboxPress}>
      <Animated.View
        style={[
          styles.checkbox,
          {transform: [{scale: springValueRef.current}]},
        ]}>
        {(checked && iconComponent) ||
          (checked && radio && renderRadioIcon()) ||
          (checked && (
            <Check
              width={checkboxSizes.check}
              height={checkboxSizes.check}
              fill={tickColor || theme.colors.white}
            />
          ))}
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={opacity}
        disabled={!textClickable || disabled}
        onPress={onCheckboxPress}>
        {renderControl()}
        <Block style={styles.textContainer}>
          <Text
            style={[
              styles.textStyle,
              disabled ? styles.textStyleDisabled : {},
              error ? styles.textStyleError : {},
            ]}>
            {text}
          </Text>
        </Block>
      </TouchableOpacity>
      {!!error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

Checkbox.defaultProps = {
  value: false,
  text: '',
  name: 'checkbox',
  onPress: () => {},
  opacity: 0.8,
  radio: false,
  shouldCheckboxChange: true,
  size: 'regular',
  textClickable: true,
};

export default Checkbox;
