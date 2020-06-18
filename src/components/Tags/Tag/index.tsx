import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';

import Text from '../../Text';
import { Close } from '../../Icons';
import withTheme from '../../withTheme';
import getStyles from './styles';

export interface ITagProps extends TouchableOpacityProps {
  children: React.ReactNode;
  disabled?: boolean;
  theme?: any;
  color?: string;
  textColor?: string;
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'small' | 'large';
  withCross?: boolean; 
  shadow?: boolean;
  style?: any;
  onTagChange: (...args: any[]) => any;
}
export interface ITagState {
  selected: boolean;
}
class Tag extends React.Component<ITagProps, ITagState> {
  static defaultProps: any;
  state = {
    selected: false,
  };
  
  handlePress = () => {
    if(!this.props.withCross){
      this.handleChange();
    }
    else if(!this.state.selected) {
      this.handleChange();
    }
  };
  handleChange = () => {
    const { onTagChange } = this.props;
    this.setState({selected: !this.state.selected}, () => {
    onTagChange();
  });
  }
  render() {
    const {
      withCross,
      style,
      children,
      theme,
      textColor,
      ...props
    } = this.props;
    const styles: any = getStyles(theme, this.props, this.state);
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={1}
        onPress={this.handlePress}
        style={[styles.tag, style]}>
          <View style={styles.content}>
            <Text style={styles.tagText}>{children}</Text>
            {
              this.state.selected && withCross 
              && (
                  <Close
                    fill={textColor || theme.colors.white}
                    style={styles.closeButton}
                    onPress={this.handleChange}
                  />
            )}
          </View>
      </TouchableOpacity>
    );
  }
}
Tag.defaultProps = {
  disabled: false,
  size: 'small',
  shape: 'rounded',
  shadow: false,
  onTagChange: () => {}
};
export default withTheme(Tag);
