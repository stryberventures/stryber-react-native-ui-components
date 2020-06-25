import * as React from 'react';
import Svg, {Path, Rect, G} from 'react-native-svg';
import withTheme from '../withTheme';
type CloseProps = {
  width?: number;
  height?: number;
  fill?: string;
  theme?: {
    colors: {
      gray15: string;
    };
  };
};
const Close: React.SFC<CloseProps> = props => (
  <Svg
    viewBox="0 0 12 12"
    fill={props.fill || props.theme?.colors.gray15}
    {...props}>
    <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <G transform="translate(-76.000000, -409.000000)">
            <G transform="translate(16.000000, 398.000000)">
                <G transform="translate(60.000000, 11.000000)">
                    <Rect x="1.75431626" y="1.04843391" width="8.47058824" height="8.47058824"></Rect>
                    <Path d="M10.0484339,5.46019862 L6.51902215,5.46019862 L6.51902215,1.93078685 C6.51902215,1.83328685 6.44005156,1.75431626 6.34255156,1.75431626 L5.63666921,1.75431626 C5.53916921,1.75431626 5.46019862,1.83328685 5.46019862,1.93078685 L5.46019862,5.46019862 L1.93078685,5.46019862 C1.83328685,5.46019862 1.75431626,5.53916921 1.75431626,5.63666921 L1.75431626,6.34255156 C1.75431626,6.44005156 1.83328685,6.51902215 1.93078685,6.51902215 L5.46019862,6.51902215 L5.46019862,10.0484339 C5.46019862,10.1459339 5.53916921,10.2249045 5.63666921,10.2249045 L6.34255156,10.2249045 C6.44005156,10.2249045 6.51902215,10.1459339 6.51902215,10.0484339 L6.51902215,6.51902215 L10.0484339,6.51902215 C10.1459339,6.51902215 10.2249045,6.44005156 10.2249045,6.34255156 L10.2249045,5.63666921 C10.2249045,5.53916921 10.1459339,5.46019862 10.0484339,5.46019862 Z" id="close" fill={props.fill} transform="translate(5.989610, 5.989610) rotate(45.000000) translate(-5.989610, -5.989610) "></Path>
                </G>
            </G>
        </G>
    </G>
  </Svg>
);
Close.defaultProps = {
  width: 12,
  height: 12,
};
// @ts-ignore
export default withTheme(Close);
