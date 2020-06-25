import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import withTheme from '../withTheme';
type SpeakerMuteProps = {
  width?: number;
  height?: number;
  theme?: {
    colors: {
      primary: string;
    };
  };
};
const SpeakerMute: React.SFC<SpeakerMuteProps> = props => {
  return (
    <Svg
      viewBox="0 0 12 18"
      width={props.width}
      height={props.height}
      fill={props.theme?.colors.primary}
      {...props}>
      <Path
        d="M12 1.126v15.748c0 1.005-1.216 1.5-1.92.796L5.908 13.5H1.125A1.125 1.125 0 0 1 0 12.375v-6.75C0 5.004.504 4.5 1.125 4.5h4.784l4.17-4.17C10.784-.373 12 .12 12 1.126zm-1.5.905l-3.64 3.64c-.211.21-.497.329-.796.329H1.5v6h4.564c.299 0 .585.119.796.33l3.64 3.639V2.03z"
        fillRule="evenodd"
      />
    </Svg>
  );
};
SpeakerMute.defaultProps = {
  width: 12,
  height: 18,
};
// @ts-ignore
export default withTheme(SpeakerMute);
