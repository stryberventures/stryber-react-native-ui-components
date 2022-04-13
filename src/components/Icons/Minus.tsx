import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {useTheme} from '../Theme';

const Minus: React.FC<SvgProps> = ({fill, ...rest}) => {
  const {theme} = useTheme();
  return (
    <Svg viewBox="0 0 11 2" {...rest}>
      <Path
        fill={fill || theme.colors.gray15}
        stroke={fill || theme.colors.gray15}
        strokeWidth="1"
        d="M10.2812 0H0.21875C0.0978906 0 0 0.0978906 0 0.21875V1.09375C0 1.21461 0.0978906 1.3125 0.21875 1.3125H10.2812C10.4021 1.3125 10.5 1.21461 10.5 1.09375V0.21875C10.5 0.0978906 10.4021 0 10.2812 0Z"
      />
    </Svg>
  );
};

Minus.defaultProps = {
  width: 11,
  height: 2,
};
// @ts-ignore
export default Minus;
