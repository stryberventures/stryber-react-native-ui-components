import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import withTheme from '../withTheme';
type EyeProps = {
  width?: number;
  height?: number;
  theme: {
    colors?: {
      primary?: string;
    };
  };
};
const Eye: React.SFC<EyeProps> = props => {
  return (
    <Svg
      viewBox="0 0 20 20"
      width={props.width}
      height={props.height}
      fill={props.theme.colors!.primary}
      {...props}>
      <Path d="M18.5714507,10.4285791 C17.5111816,8.78795214 16.060287,7.38170046 14.3192135,6.48884225 C14.7656426,7.24777173 15.0000179,8.11830848 15.0000179,9.00000596 C15.0000179,11.7567057 12.7567116,14.0000119 10.0000119,14.0000119 C7.24331221,14.0000119 5.00000596,11.7567057 5.00000596,9.00000596 C5.00000596,8.11830848 5.23438124,7.24777173 5.68081034,6.48884225 C3.93973684,7.38170046 2.48884225,8.78795214 1.42857313,10.4285791 C3.33705755,13.3750112 6.41741836,15.4285851 10.0000119,15.4285851 C13.5826055,15.4285851 16.6629663,13.3750112 18.5714507,10.4285791 Z M10.5357268,6.1428597 C10.5357268,5.85268078 10.2901908,5.60714477 10.0000119,5.60714477 C8.13617041,5.60714477 6.60715073,7.13616445 6.60715073,9.00000596 C6.60715073,9.29018488 6.85268674,9.53572088 7.14286566,9.53572088 C7.43304458,9.53572088 7.67858058,9.29018488 7.67858058,9.00000596 C7.67858058,7.72768302 8.72768898,6.67857462 10.0000119,6.67857462 C10.2901908,6.67857462 10.5357268,6.43303861 10.5357268,6.1428597 Z M20.0000238,10.4285791 C20.0000238,10.7075973 19.910738,10.964294 19.7768093,11.1986693 C17.7232354,14.5803698 13.9620702,16.8571582 10.0000119,16.8571582 C6.03795363,16.8571582 2.27678843,14.569209 0.223214552,11.1986693 C0.0892858207,10.964294 0,10.7075973 0,10.4285791 C0,10.1495609 0.0892858207,9.89286417 0.223214552,9.65848889 C2.27678843,6.28794916 6.03795363,4 10.0000119,4 C13.9620702,4 17.7232354,6.28794916 19.7768093,9.65848889 C19.910738,9.89286417 20.0000238,10.1495609 20.0000238,10.4285791 Z" />
    </Svg>
  );
};
Eye.defaultProps = {
  width: 20,
  height: 18,
};
// @ts-ignore
export default withTheme(Eye);
