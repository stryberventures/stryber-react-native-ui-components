import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import style from './style';

export default function CenterView({children, middle, bottom}) {
  const centerViewStyles = [middle && style.middle, bottom && style.bottom];
  return <View style={[style.main, ...centerViewStyles]}>{children}</View>;
}

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
  middle: PropTypes.bool,
  bottom: PropTypes.bool,
};
