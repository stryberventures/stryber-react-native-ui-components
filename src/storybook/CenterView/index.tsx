import React from 'react';
import {View} from 'react-native';
import getStyles from './style';

interface ICenterView {
  middle?: boolean;
  bottom?: boolean;
}

const CenterView: React.FC<ICenterView> = ({
  children,
  middle = false,
  bottom = false,
}) => {
  const styles = getStyles(middle, bottom);
  return (
    <View style={[styles.main, styles.middle, styles.bottom]}>{children}</View>
  );
};

export default CenterView;
