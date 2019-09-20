import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';


import styles from './styles';
import { isIphoneX } from '../../utils';


class SafeArea extends Component {
  static forceInset = { top: 28, bottom: 25, horizontal: 'never' };
  render() {
    const {
      style, transparent,
    } = this.props;
    return (
      <SafeAreaProvider>
      <SafeAreaView
        forceInset={isIphoneX()
          ? Object.assign({}, SafeArea.forceInset, this.props.forceInset)
          : { top: 'never', bottom: 'never', horizontal: 'never' }}
        style={[styles.container, style, transparent ? styles.transparent : {}]}
      >
        {this.props.children}
      </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default SafeArea;

SafeArea.defaultProps = {
  children: {},
  style: {},
  topStyle: {},
  bottomStyle: {},
  forceInset: SafeArea.forceInset,
  transparent: false,
};

SafeArea.propTypes = {
  transparent: PropTypes.bool,
  forceInset: PropTypes.shape({}),
  style: PropTypes.shape({}),
  topStyle: PropTypes.shape({}),
  bottomStyle: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.number),
  ]),
};
