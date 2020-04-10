import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
type CheckProps = {
  width?: number;
  height?: number;
  fill?: string;
};
const Check: React.SFC<CheckProps> = props => (
  <Svg
    width={props.width}
    height={props.height}
    fill={props.fill}
    {...props}
    viewBox="0 0 13 11">
    <G stroke="none" strokeWidth="1" fillRule="evenodd">
      <G transform="translate(-3.000000, -4.000000)" fillRule="nonzero">
        <Path d="M3.89188126,9.9653644 L7.16423288,14.3097417 C7.49578779,14.7509044 7.97264341,15 8.48091541,15 C8.49830662,15 8.51681984,15 8.53477205,14.999462 C9.06267928,14.9811699 9.54177893,14.6960281 9.85033257,14.2177431 L15.5899913,5.30571715 C15.8486153,4.90382863 15.7184618,4.37550931 15.2988289,4.12748976 C14.8791959,3.8794702 14.3288484,4.00428698 14.0702244,4.40671351 L8.46240219,13.1094561 L5.34040036,8.96360211 C5.05148195,8.58054371 4.49384137,8.49392516 4.09384365,8.7709969 C3.69384593,9.04806864 3.60296286,9.58230599 3.89188126,9.9653644 Z" />
      </G>
    </G>
  </Svg>
);
Check.defaultProps = {
  width: 13,
  height: 11,
  fill: '#fff',
};
export default Check;
