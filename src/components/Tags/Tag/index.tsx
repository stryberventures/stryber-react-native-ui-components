import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';

import Text from '../../Text';
import {Close} from '../../Icons';
import getStyles from './styles';
import {FC, useState} from 'react';
import {useTheme} from '../../Theme';

export interface ITagProps extends TouchableOpacityProps {
  children: React.ReactNode;
  disabled?: boolean;
  color?: string;
  textColor?: string;
  disabledColor?: string;
  selectedColor?: string;
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'small' | 'large';
  withCross?: boolean;
  shadow?: boolean;
  style?: any;
  onTagChange: (...args: any[]) => any;
  preselected?: boolean;
  resetTag?: boolean;
}

const Tag: FC<ITagProps> = ({
  disabled,
  color,
  disabledColor,
  textColor,
  size,
  shape,
  selectedColor,
  shadow,
  withCross,
  style,
  onTagChange,
  preselected,
  children,
  ...rest
}) => {
  const {theme} = useTheme();
  const [selected, setSelected] = useState(preselected);
  const styles = getStyles(
    theme,
    {
      disabled,
      color,
      disabledColor,
      textColor,
      size,
      shape,
      selectedColor,
      shadow,
    },
    selected!,
  );

  const handleChange = () => {
    setSelected(prevSelected => !prevSelected);
    onTagChange();
  };

  const handlePress = () => {
    if (!withCross) {
      handleChange();
    } else if (!selected) {
      handleChange();
    }
  };

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={1}
      onPress={handlePress}
      style={[styles.tag, style]}>
      <View style={styles.content}>
        <Text style={styles.tagText}>{children}</Text>
        {selected && withCross && (
          <Close
            fill={theme.colors.white}
            style={styles.closeButton}
            onPress={handleChange}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

Tag.defaultProps = {
  disabled: false,
  size: 'small',
  shape: 'rounded',
  shadow: false,
  onTagChange: () => {},
  preselected: false,
};
export default Tag;
