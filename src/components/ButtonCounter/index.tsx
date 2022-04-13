import * as React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import * as Icons from '../Icons';
import Text from '../Text';
import getStyles from './styles';
import {SvgProps} from 'react-native-svg';
import {FC, useState} from 'react';
import {useTheme} from '../Theme';

export interface IButtonCounterProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  children: React.ReactNode;
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'regular' | 'small' | 'mini';
  disabled?: boolean;
  shadow?: boolean;
  color?: string;
  renderContent?: (
    children: any,
    style: StyleProp<TextStyle>,
  ) => React.ReactNode;
  countTextTemplate?: string;
  secondaryColor?: string;
  renderMinusIcon?: () => React.ReactNode;
  renderPlusIcon?: () => React.ReactNode;
  iconProps?: SvgProps;
  renderCount?: (i: number, style: StyleProp<TextStyle>) => React.ReactNode;
  onCountChange: (count: number, i: number) => void;
}

const ButtonCounter: FC<IButtonCounterProps> = ({
  initialValue,
  onCountChange,
  style,
  children,
  iconProps,
  renderCount,
  renderContent,
  renderMinusIcon,
  renderPlusIcon,
  minValue,
  maxValue,
  color,
  secondaryColor,
  size,
  shape,
  disabled,
  shadow,
  ...rest
}) => {
  const {theme} = useTheme();
  const [count, setCount] = useState(initialValue!);
  const [isTouched, setIsTouched] = useState(false);
  const minusButtonDisabled = count === minValue;
  const plusButtonDisabled = !!maxValue && count === maxValue;
  const styles = getStyles(
    theme,
    {
      color,
      secondaryColor,
      size,
      shape,
      disabled,
      iconProps,
      minValue,
      maxValue,
      shadow,
    },
    count,
    isTouched,
  );

  const handlePressIn = () => setIsTouched(true);
  const handlePressOut = () => setIsTouched(false);

  const onButtonPress = (increment: number) => {
    setCount(countState => countState + increment);
    onCountChange(count + increment, increment);
  };

  if (count > 0) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.leftCol}>
          <TouchableOpacity
            disabled={minusButtonDisabled}
            onPress={() => onButtonPress(-1)}
            style={styles.reduceButton}>
            {(renderMinusIcon && renderMinusIcon()) || (
              <Icons.Minus
                {...iconProps}
                fill={styles.buttonIconMinus.color}
                style={styles.buttonIcon}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.centerCol}>
          {renderCount!(count, styles.buttonText)}
        </View>
        <View style={styles.rightCol}>
          <TouchableOpacity
            disabled={plusButtonDisabled}
            onPress={() => onButtonPress(1)}
            style={styles.growButton}>
            {(renderPlusIcon && renderPlusIcon()) || (
              <Icons.Plus
                {...iconProps}
                fill={styles.buttonIconPlus.color}
                style={styles.buttonIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onButtonPress(1)}
      style={[styles.button, style]}>
      {renderContent!(children, styles.buttonText)}
      <View style={styles.touchOverlay} />
    </TouchableOpacity>
  );
};

ButtonCounter.defaultProps = {
  initialValue: 0,
  minValue: 0,
  iconProps: {},
  size: 'regular',
  shape: 'rounded',
  disabled: false,
  shadow: false,
  onPress: () => {},
  renderCount: (count: number, style: StyleProp<TextStyle>) => (
    <Text style={style}>{count}</Text>
  ),
  renderContent: (
    children: React.ReactNode,
    textStyle: StyleProp<TextStyle>,
  ) => <Text style={textStyle}>{children}</Text>,
};

export default ButtonCounter;
