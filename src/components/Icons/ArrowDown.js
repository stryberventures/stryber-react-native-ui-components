import React from 'react';
import Svg, {Path} from 'react-native-svg';
import PropTypes from 'prop-types';

import withTheme from '../withTheme';

const ArrowDown = props => (
  <Svg viewBox="0 0 24 24" fill={props.theme.colors.gray} {...props}>
    <Path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </Svg>
);

ArrowDown.defaultProps = {
  width: 30,
  height: 30,
};

ArrowDown.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  theme: PropTypes.shape({colors: PropTypes.shape({gray: PropTypes.string})})
    .isRequired,
};

export default withTheme(ArrowDown);
