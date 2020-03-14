import React, {Component} from 'react';
import {View} from 'react-native';
import Input from '../Input';
import withTheme from '../withTheme';
import {Search} from '../Icons';
interface ISearchFieldProps {
  theme?: any;
  props?: any;
}
type SearchFieldState = {
  value?: any;
};
class SearchField extends Component<ISearchFieldProps, SearchFieldState> {
  static defaultProps: any;
  state = {
    value: '',
  };
  onRequestChange = value => this.setState({value});
  render() {
    const {theme, ...props} = this.props;
    return (
      <View>
        <Input
          icon={() => <Search />}
          onChange={this.onRequestChange}
          iconBackground={false}
          {...props}
        />
      </View>
    );
  }
}
SearchField.defaultProps = {};
export default withTheme(SearchField);
