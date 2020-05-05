import * as React from 'react';
import Svg, {Path, Defs, G, Mask, Rect, Use} from 'react-native-svg';
import withTheme from '../withTheme';
type CalendarProps = {
  size?: number;
  theme: {
    colors?: {
      gray?: string;
    };
  };
  fill: string;
};
const Calendar: React.SFC<CalendarProps> = props => (
  <Svg width={props.size} height={props.size} viewBox="0 0 20 20">
    <Defs>
      <Path
        d="M2.42307692,18.5714286 L5.625,18.5714286 L5.625,15.3571429 L2.42307692,15.3571429 L2.42307692,18.5714286 Z M6.33653846,18.5714286 L9.89423077,18.5714286 L9.89423077,15.3571429 L6.33653846,15.3571429 L6.33653846,18.5714286 Z M2.42307692,14.6428571 L5.625,14.6428571 L5.625,11.0714286 L2.42307692,11.0714286 L2.42307692,14.6428571 Z M6.33653846,14.6428571 L9.89423077,14.6428571 L9.89423077,11.0714286 L6.33653846,11.0714286 L6.33653846,14.6428571 Z M2.42307692,10.3571429 L5.625,10.3571429 L5.625,7.14285714 L2.42307692,7.14285714 L2.42307692,10.3571429 Z M10.6057692,18.5714286 L14.1634615,18.5714286 L14.1634615,15.3571429 L10.6057692,15.3571429 L10.6057692,18.5714286 Z M6.33653846,10.3571429 L9.89423077,10.3571429 L9.89423077,7.14285714 L6.33653846,7.14285714 L6.33653846,10.3571429 Z M14.875,18.5714286 L18.0769231,18.5714286 L18.0769231,15.3571429 L14.875,15.3571429 L14.875,18.5714286 Z M10.6057692,14.6428571 L14.1634615,14.6428571 L14.1634615,11.0714286 L10.6057692,11.0714286 L10.6057692,14.6428571 Z M6.69230769,5 L6.69230769,1.78571429 C6.69230769,1.59598214 6.52554087,1.42857143 6.33653846,1.42857143 L5.625,1.42857143 C5.4359976,1.42857143 5.26923077,1.59598214 5.26923077,1.78571429 L5.26923077,5 C5.26923077,5.18973214 5.4359976,5.35714286 5.625,5.35714286 L6.33653846,5.35714286 C6.52554087,5.35714286 6.69230769,5.18973214 6.69230769,5 Z M14.875,14.6428571 L18.0769231,14.6428571 L18.0769231,11.0714286 L14.875,11.0714286 L14.875,14.6428571 Z M10.6057692,10.3571429 L14.1634615,10.3571429 L14.1634615,7.14285714 L10.6057692,7.14285714 L10.6057692,10.3571429 Z M14.875,10.3571429 L18.0769231,10.3571429 L18.0769231,7.14285714 L14.875,7.14285714 L14.875,10.3571429 Z M15.2307692,5 L15.2307692,1.78571429 C15.2307692,1.59598214 15.0640024,1.42857143 14.875,1.42857143 L14.1634615,1.42857143 C13.9744591,1.42857143 13.8076923,1.59598214 13.8076923,1.78571429 L13.8076923,5 C13.8076923,5.18973214 13.9744591,5.35714286 14.1634615,5.35714286 L14.875,5.35714286 C15.0640024,5.35714286 15.2307692,5.18973214 15.2307692,5 Z M19.5,4.28571429 L19.5,18.5714286 C19.5,19.3526786 18.8551683,20 18.0769231,20 L2.42307692,20 C1.64483173,20 1,19.3526786 1,18.5714286 L1,4.28571429 C1,3.50446429 1.64483173,2.85714286 2.42307692,2.85714286 L3.84615385,2.85714286 L3.84615385,1.78571429 C3.84615385,0.803571429 4.64663462,0 5.625,0 L6.33653846,0 C7.31490385,0 8.11538462,0.803571429 8.11538462,1.78571429 L8.11538462,2.85714286 L12.3846154,2.85714286 L12.3846154,1.78571429 C12.3846154,0.803571429 13.1850962,0 14.1634615,0 L14.875,0 C15.8533654,0 16.6538462,0.803571429 16.6538462,1.78571429 L16.6538462,2.85714286 L18.0769231,2.85714286 C18.8551683,2.85714286 19.5,3.50446429 19.5,4.28571429 Z"
        id="path-1"
      />
    </Defs>
    <G
      id="Form/Element/Icon/Calendar"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd">
      <Mask id="mask-2" fill="white">
        <Use xlinkHref="#path-1" />
      </Mask>
      <Use id="calendar---FontAwesome" fill="#ECEFF1" xlinkHref="#path-1" />
      <G id="Main-Color/Sky" mask="url(#mask-2)" fill={props.fill}>
        <Rect id="Rectangle" x="0" y="0" width="20" height="20" />
      </G>
    </G>
  </Svg>
);
Calendar.defaultProps = {
  size: 20,
};
// @ts-ignore
export default withTheme(Calendar);