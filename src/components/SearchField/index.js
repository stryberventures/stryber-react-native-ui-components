import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {Input} from '../index';
import withTheme from '../withTheme';
import {Search} from '../Icons';

class SearchField extends Component {
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

SearchField.propTypes = {
  theme: PropTypes.shape({}).isRequired,
};

export default withTheme(SearchField);
