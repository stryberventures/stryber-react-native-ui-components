import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import withTheme from '../withTheme';
type SpeakerProps = {
  width?: number;
  height?: number;
  theme: {
    colors: {
      primary: string;
    };
  };
};
const Speaker: React.SFC<SpeakerProps> = props => {
  return (
    <Svg
      viewBox="0 0 18 18"
      width={props.width}
      height={props.height}
      fill={props.theme.colors.primary}
      {...props}>
      <Path
        d="M16.025 5.479a.75.75 0 1 0-.783 1.28A2.61 2.61 0 0 1 16.5 9c0 .922-.47 1.76-1.258 2.242a.75.75 0 1 0 .783 1.28A4.1 4.1 0 0 0 18 9a4.1 4.1 0 0 0-1.975-3.521zM12 1.126v15.748c0 1.005-1.216 1.5-1.92.796L5.908 13.5H1.125A1.125 1.125 0 0 1 0 12.375v-6.75C0 5.004.504 4.5 1.125 4.5h4.784l4.17-4.17C10.784-.373 12 .12 12 1.126zm-1.5.905l-3.64 3.64c-.211.21-.497.329-.796.329H1.5v6h4.564c.299 0 .585.119.796.33l3.64 3.639V2.03z"
        fillRule="evenodd"
      />
    </Svg>
  );
};
Speaker.defaultProps = {
  width: 18,
  height: 18,
};
// @ts-ignore
export default withTheme(Speaker);
