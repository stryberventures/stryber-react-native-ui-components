import React, {Component} from 'react';
import {Animated, FlatList, Modal, View} from 'react-native';
import PropTypes from 'prop-types';

import getStyles from './styles';
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
    const styles = getStyles(theme);
    return (
      <View>
        <Input
          icon={() => <Search />}
          onChange={this.onRequestChange}
          iconBackground={false}
          {...props}
        />
        {/*<Modal visible={modal} transparent onRequestClose={this.blur}>*/}
        {/*  <Animated.View*/}
        {/*    style={[styles.overlay, overlayStyle, overlayStyleOverrides]}*/}
        {/*    onStartShouldSetResponder={() => true}*/}
        {/*    onResponderRelease={this.blur}>*/}
        {/*    <View*/}
        {/*      style={[styles.picker, pickerStyle, pickerStyleOverrides]}*/}
        {/*      onStartShouldSetResponder={() => true}>*/}
        {/*      <FlatList*/}
        {/*        ref={this.scroll}*/}
        {/*        data={data}*/}
        {/*        style={[styles.scroll]}*/}
        {/*        renderItem={this.renderItem}*/}
        {/*        keyExtractor={this.keyExtractor}*/}
        {/*        scrollEnabled={visibleItemCount < itemCount}*/}
        {/*        contentContainerStyle={styles.scrollContainer}*/}
        {/*      />*/}
        {/*    </View>*/}
        {/*  </Animated.View>*/}
        {/*</Modal>*/}
      </View>
    );
  }
}

SearchField.defaultProps = {};

SearchField.propTypes = {
  theme: PropTypes.shape({}).isRequired,
};

export default withTheme(SearchField);
