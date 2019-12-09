import React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import PropTypes from 'prop-types';

import withTheme from '../withTheme';

const Search = props => {
  console.log(props);
  return (
    <Svg
      viewBox="0 0 20 20"
      fill={props.theme.colors.gray2}
      width={props.width}
      height={props.height}
      {...props}>
      <G stroke="none" strokeWidth="1" fillRule="evenodd">
        <Path d="M13.8571582,7.85714626 C13.8571582,5.10045251 11.6138519,2.85714626 8.85714626,2.85714626 C6.10045251,2.85714626 3.85714626,5.10045251 3.85714626,7.85714626 C3.85714626,10.6138519 6.10045251,12.8571582 8.85714626,12.8571582 C11.6138519,12.8571582 13.8571582,10.6138519 13.8571582,7.85714626 Z M19.5714507,17.1428776 C19.5714507,17.9241285 18.9241285,18.5714507 18.1428776,18.5714507 C17.7634128,18.5714507 17.3951088,18.4152005 17.1384121,18.1473431 L13.3102825,14.3303742 C12.0044774,15.2343932 10.4419755,15.7143044 8.85715222,15.7143044 C4.51562919,15.7143044 1,12.1986753 1,7.85715222 C1,3.51562919 4.51562919,0 8.85715222,0 C13.1986753,0 16.7143044,3.51562919 16.7143044,7.85715222 C16.7143044,9.44197554 16.2343932,11.0044774 15.3303742,12.3102825 L19.1585038,16.1384121 C19.4152005,16.3951088 19.5714507,16.7634128 19.5714507,17.1428776 Z" />
      </G>
    </Svg>
  );
};

Search.defaultProps = {
  width: 20,
  height: 20,
};

Search.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  theme: PropTypes.shape({colors: PropTypes.shape({gray2: PropTypes.string})})
    .isRequired,
};

export default withTheme(Search);
