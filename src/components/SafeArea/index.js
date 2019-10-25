import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';

import styles from './styles';

class SafeArea extends Component {
  render() {
    const {style, transparent, children} = this.props;
    return (
      <SafeAreaView
        style={[
          styles.container,
          style,
          transparent ? styles.transparent : {},
        ]}>
        {children}
      </SafeAreaView>
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
