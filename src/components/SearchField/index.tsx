import React, {Component} from 'react';
import {View} from 'react-native';
import Input from '../Input';
import withTheme from '../withTheme';
import {Search} from '../Icons';
interface ISearchFieldProps extends React.HTMLAttributes<Element> {
  theme: {};
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
