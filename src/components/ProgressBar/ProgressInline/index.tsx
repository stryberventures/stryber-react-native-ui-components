import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import withTheme from '../../withTheme';
import getStyles from './styles';

export interface IProgressInlineProps {
  size: 'small' | 'large';
  title?: string;
  infoShowed?: boolean;
  value: number;
  totalValue: number;
  theme?: any;
}
class ProgressInline extends Component<IProgressInlineProps> {
  static defaultProps: any;  

  render() {
  const {
    size,
    value,
    totalValue,
    title,
    infoShowed,
    theme,
    ...props
  } = this.props;
  const styles = getStyles(theme, this.props);
    return (
      <View >
        { 
          infoShowed && <View style={styles.info}>
            <Text>{title}</Text>
            <Text>{value}</Text>
          </View>
        }
        <View style={styles.inlineBar}>
          <View style={[StyleSheet.absoluteFill, styles.inlineProgress]} />
        </View>
      </View>
    );
  }
}

export default withTheme(ProgressInline);