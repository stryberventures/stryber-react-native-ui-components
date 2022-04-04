import React, {FC} from 'react';
import {View, Text, StyleSheet, ViewProps} from 'react-native';
import getStyles from './styles';
import {useTheme} from '../../Theme';

export interface IProgressInlineProps extends ViewProps {
  size: 'small' | 'large';
  title?: string;
  infoShowed?: boolean;
  value: number;
  totalValue: number;
}

const ProgressInline: FC<IProgressInlineProps> = ({
  value,
  title,
  infoShowed,
  totalValue,
  size,
  ...rest
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme, size, value, totalValue);

  return (
    <View {...rest}>
      {infoShowed && (
        <View style={styles.info}>
          <Text>{title}</Text>
          <Text>{value}</Text>
        </View>
      )}
      <View style={styles.inlineBar}>
        <View style={[StyleSheet.absoluteFill, styles.inlineProgress]} />
      </View>
    </View>
  );
};

export default ProgressInline;
