import {
  Platform,
  Dimensions,
} from 'react-native';

export const isIphoneX = () => Platform.OS === 'ios'
  && !isTablet()
  && !Platform.isTVOS
  && (
    Dimensions.get('window').height === 812
    || Dimensions.get('window').width === 812
    || Dimensions.get('window').height === 896
    || Dimensions.get('window').width === 896
  );

export const isTablet = () => Platform.isPad;
