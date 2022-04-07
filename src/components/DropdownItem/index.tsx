import React, {FC, useState} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import getStyles from './styles';
import {useTheme} from '../Theme';

interface IDropdownItemProps {
  index: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (index: number) => void;
}

const DropdownItem: FC<IDropdownItemProps> = ({
  children,
  style,
  index,
  onPress,
  ...rest
}) => {
  const {theme} = useTheme();
  const [isTouched, setIsTouched] = useState(false);

  const styles = getStyles(theme);

  const onPressIn = () => setIsTouched(true);
  const onPressOut = () => setIsTouched(false);
  const onItemPress = () => onPress!(index);

  return (
    // @ts-ignore
    <TouchableOpacity
      {...rest}
      activeOpacity={1}
      onPress={onItemPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.container}>
      <View
        pointerEvents="box-only"
        style={[
          styles.content,
          style,
          isTouched
            ? {
                backgroundColor: theme.colors.gray5,
              }
            : {},
        ]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

DropdownItem.defaultProps = {
  onPress: () => {},
  style: {},
};
export default DropdownItem;
