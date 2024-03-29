import * as React from 'react';
import Svg, {Path, G, SvgProps} from 'react-native-svg';

const UserIcon: React.FC<SvgProps> = ({fill, ...rest}) => (
  <Svg viewBox="0 0 19 19" {...rest}>
    <G fill="none" fill-rule="evenodd" stroke={fill} stroke-width="1.02">
      <Path d="M7.145 6.422a2.366 2.366 0 0 0 2.368 2.364 2.366 2.366 0 0 0 2.368-2.364" />
      <Path d="M4.303 6.26a5.206 5.206 0 0 0 5.21 5.2 5.206 5.206 0 0 0 5.21-5.2 5.206 5.206 0 0 0-5.21-5.203 5.206 5.206 0 0 0-5.21 5.202zM15.968 17.944c0-3.56-2.89-6.445-6.455-6.445s-6.456 2.885-6.456 6.445h12.911z" />
    </G>
  </Svg>
);

UserIcon.defaultProps = {
  width: 20,
  height: 20,
  fill: '#fff',
};

export default UserIcon;
