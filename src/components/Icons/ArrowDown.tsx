import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import withTheme from '../withTheme';
type ArrowDownProps = {
  width?: number;
  height?: number;
  fill?: string;
  theme?: {
    colors: {
      gray15: string;
    };
  };
};
const ArrowDown: React.SFC<ArrowDownProps> = props => (
  <Svg
    viewBox="0 0 12 6"
    fill={props.fill || props.theme?.colors.gray15}
    {...props}>
    <Path d="M6 6l6-6H0z" fillRule="evenodd" />
  </Svg>
);
ArrowDown.defaultProps = {
  width: 12,
  height: 6,
};
// @ts-ignore
export default withTheme(ArrowDown);
