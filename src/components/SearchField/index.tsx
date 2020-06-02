import React, {Component} from 'react';
import {View} from 'react-native';
import Input, {IInputProps} from '../Input';
import withTheme from '../withTheme';
import {Search} from '../Icons';

interface ISearchFieldProps extends IInputProps {
  theme?: any;
  props?: any;
  iconColor?: string;
}
type SearchFieldState = {
  value?: any;
};
class SearchField extends Component<ISearchFieldProps, SearchFieldState> {
  static defaultProps: any;
  state = {
    value: '',
  };
  onRequestChange = (value: any) => this.setState({value});
  render() {
    const {theme, iconColor, ...props} = this.props;
    return (
      <View>
        <Input
          {...props}
          icon={() => <Search fill={iconColor || theme.colors.primary} />}
          onChange={this.onRequestChange}
        />
      </View>
    );
  }
}
SearchField.defaultProps = {};
export default withTheme(SearchField);
