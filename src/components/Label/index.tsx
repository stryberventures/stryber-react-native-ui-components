import React, {Component} from 'react';
import {View} from 'react-native';

import withTheme from '../withTheme';
import Text from '../Text';
import {getStyles} from './styles';

interface ILabelProps {
  theme?: any;
  children?: string;
  disabled?: boolean;
  error?: boolean;
  classes?: any;
}
class Label extends Component<ILabelProps> {
  render() {
    const {disabled, error, children, classes, theme} = this.props;
    const styles = getStyles({classes, theme});

    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            disabled ? styles.textDisabled : {},
            error ? styles.textError : {},
          ]}>
          {children}
        </Text>
      </View>
    );
  }
}
export default withTheme(Label);
