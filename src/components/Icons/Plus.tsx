import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {useTheme} from '../Theme';

const Plus: React.FC<SvgProps> = ({fill, ...rest}) => {
  const {theme} = useTheme();
  return (
    <Svg viewBox="0 0 11 11" {...rest}>
      <Path
        fill={fill || theme.colors.gray15}
        stroke={fill || theme.colors.gray15}
        strokeWidth="1"
        d="M10.2812 4.59375H5.90625V0.21875C5.90625 0.0978906 5.80836 0 5.6875 0H4.8125C4.69164 0 4.59375 0.0978906 4.59375 0.21875V4.59375H0.21875C0.0978906 4.59375 0 4.69164 0 4.8125V5.6875C0 5.80836 0.0978906 5.90625 0.21875 5.90625H4.59375V10.2812C4.59375 10.4021 4.69164 10.5 4.8125 10.5H5.6875C5.80836 10.5 5.90625 10.4021 5.90625 10.2812V5.90625H10.2812C10.4021 5.90625 10.5 5.80836 10.5 5.6875V4.8125C10.5 4.69164 10.4021 4.59375 10.2812 4.59375Z"
      />
    </Svg>
  );
};
Plus.defaultProps = {
  width: 11,
  height: 11,
};

export default Plus;
