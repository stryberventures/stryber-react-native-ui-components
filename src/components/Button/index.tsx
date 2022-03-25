import * as React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icons from '../Icons';
import Text from '../Text';
import getStyles from './styles';
import {useState} from 'react';
import {useTheme} from '../Theme';

export interface IButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  type?: 'regular' | 'outlined' | 'link';
  disabled?: boolean;
  shadow?: boolean;
  color?: string;
  secondaryColor?: string;
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'regular' | 'small' | 'mini';
  icon?: keyof typeof Icons | ((...args: any[]) => any);
  iconProps?: any;
  props?: any;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<IButtonProps> = props => {
  const {style, children, icon, iconProps, type, textStyle, ...rest} = props;
  const [isTouched, setIsTouched] = useState(false);
  const {theme} = useTheme();
  const styles = getStyles(theme, props, isTouched);

  const handlePressIn = () => setIsTouched(true);
  const handlePressOut = () => setIsTouched(false);

  const IconComponent =
    (typeof icon === 'string' && Icons[icon]) ||
    (typeof icon === 'function' && icon);

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, style]}>
      {type === 'link' ? (
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      ) : (
        <>
          <View style={styles.content}>
            {icon && (
              <View style={styles.leftIconContainer}>
                {IconComponent && (
                  <IconComponent fill={styles.icon.color} {...iconProps} />
                )}
              </View>
            )}
            <Text style={[styles.buttonText, textStyle]}>{children}</Text>
          </View>
          <View style={styles.touchOverlay} />
        </>
      )}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  type: 'regular',
  disabled: false,
  size: 'regular',
  shape: 'rounded',
  shadow: false,
  onPress: () => {},
};

export default Button;
