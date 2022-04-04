import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {useTheme} from '../Theme';

const ArrowDown: React.FC<SvgProps> = ({fill, ...rest}) => {
  const {theme} = useTheme();
  return (
    <Svg viewBox="0 0 12 6" fill={fill || theme.colors.gray15} {...rest}>
      <Path d="M6 6l6-6H0z" fillRule="evenodd" />
    </Svg>
  );
};

ArrowDown.defaultProps = {
  width: 12,
  height: 6,
};

export default ArrowDown;
