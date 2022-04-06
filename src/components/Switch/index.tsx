import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  I18nManager,
} from 'react-native';
import {SwitchConfigs} from './constants';
import {getStyles} from './styles';
import Text from '../Text';
import {useTheme} from '../Theme';

export interface ISwitchProps {
  name?: string;
  value?: boolean;
  onPress?: (checked: boolean, name: string) => void;
  circleColorOff?: string;
  circleColorOn?: string;
  duration?: number;
  type?: 0 | 1;
  style?: StyleProp<ViewStyle>;
  buttonContainerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  text?: string;
  backgroundColorOff?: string;
  backgroundColorOn?: string;
  size?: 'regular' | 'large';
  error?: string;
  disabled?: boolean;
  bgColor?: string;
  textPosition?: 'right' | 'left';
}

const Switch: FC<ISwitchProps> = ({
  size,
  type,
  value,
  onPress,
  name,
  duration,
  backgroundColorOff,
  backgroundColorOn,
  style,
  error,
  disabled,
  bgColor,
  textPosition,
  text,
  circleColorOff,
  circleColorOn,
  buttonContainerStyle,
}) => {
  const {theme} = useTheme();

  const config = SwitchConfigs[size!] || SwitchConfigs.regular;
  const startPos = type === 0 ? 0 : config.padding * 2;
  const endPos = config.width - (config.circleRadius + config.padding * 2);
  const regularBgColor = bgColor || theme.colors.primary;
  const RTLDirection = I18nManager.isRTL ? -1 : 1;

  const [checked, setChecked] = useState(value);
  const animXValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const styles = getStyles({
    theme,
    size,
    textPosition,
  });

  useEffect(() => {
    runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const onSwitchPress = () => {
    setChecked(checkedVal => !checkedVal);
    onPress!(!checked, name!);
  };

  const runAnimation = () => {
    const animValue = {
      fromValue: checked ? 0 : 1,
      toValue: checked ? 1 : 0,
      duration: duration,
      useNativeDriver: false,
    };
    Animated.timing(animXValue, animValue).start();
  };

  const SwitchText = () => (
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
      {text}
    </Text>
  );

  return (
    <>
      <TouchableOpacity
        onPress={onSwitchPress}
        activeOpacity={0.5}
        disabled={disabled}
        style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
        {textPosition === 'left' && <SwitchText />}
        <Animated.View
          style={[
            styles.container,
            ...(disabled
              ? [styles.containerDisabled]
              : [
                  {
                    backgroundColor: animXValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        backgroundColorOff || theme.colors.gray15,
                        (error && styles.containerError.backgroundColor) ||
                          backgroundColorOn ||
                          regularBgColor,
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
                      backgroundColor: animXValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [circleColorOff!, circleColorOn!],
                      }),
                    },
                  ]
                : []),
              {
                transform: [
                  {
                    translateX: animXValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        (startPos || 0) * RTLDirection,
                        (endPos || 0) * RTLDirection],
                    }),
                  },
                ],
              },
            ]}>
            <Animated.View style={buttonContainerStyle} />
          </Animated.View>
        </Animated.View>
        {textPosition === 'right' && <SwitchText />}
      </TouchableOpacity>
      {!!error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </>
  );
};

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
  textPosition: 'right',
  disabled: false,
};

export default Switch;
