import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import withTheme from '../withTheme';
type ArrowDownProps = {
  width?: number;
  height?: number;
  theme: {
    colors?: {
      gray?: string;
    };
  };
};
const ArrowDown: React.SFC<ArrowDownProps> = props => (
  <Svg viewBox="0 0 24 24" fill={props.theme.colors!.gray} {...props}>
    <Path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </Svg>
);
ArrowDown.defaultProps = {
  width: 30,
  height: 30,
};
// @ts-ignore
export default withTheme(ArrowDown);
