import {Platform, Dimensions} from 'react-native';
export const isIphoneX = () =>
  Platform.OS === 'ios' &&
  !isTablet() &&
  !Platform.isTVOS &&
  (Dimensions.get('window').height === 812 ||
    Dimensions.get('window').width === 812 ||
    Dimensions.get('window').height === 896 ||
    Dimensions.get('window').width === 896);
export const isTablet = () => Platform.isPad;
export const handleMargin = size => {
  if (typeof size === 'number') {
    return {
      marginTop: size,
      marginRight: size,
      marginBottom: size,
      marginLeft: size,
    };
  }
  if (typeof size === 'object') {
    const marginSize = Object.keys(size).length;
    switch (marginSize) {
      case 1:
        return {
          marginTop: size[0],
          marginRight: size[0],
          marginBottom: size[0],
          marginLeft: size[0],
        };
      case 2:
        return {
          marginTop: size[0],
          marginRight: size[1],
          marginBottom: size[0],
          marginLeft: size[1],
        };
      case 3:
        return {
          marginTop: size[0],
          marginRight: size[1],
          marginBottom: size[2],
          marginLeft: size[1],
        };
      default:
        return {
          marginTop: size[0],
          marginRight: size[1],
          marginBottom: size[2],
          marginLeft: size[3],
        };
    }
  }
};
export const handlePadding = padding => {
  if (typeof padding === 'number') {
    return {
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding,
    };
  }
  if (typeof padding === 'object') {
    const paddingSize = Object.keys(padding).length;
    switch (paddingSize) {
      case 1:
        return {
          paddingTop: padding[0],
          paddingRight: padding[0],
          paddingBottom: padding[0],
          paddingLeft: padding[0],
        };
      case 2:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[0],
          paddingLeft: padding[1],
        };
      case 3:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[1],
        };
      default:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[3],
        };
    }
  }
};
export function memoize(callback) {
  let previous;
  let result;
  return (...dependencies) => {
    let hasChanged = false;
    if (previous) {
      if (previous.length !== dependencies.length) {
        hasChanged = true;
      } else {
        for (let i = 0; i < previous.length; i++) {
          if (previous[i] !== dependencies[i]) {
            hasChanged = true;
            break;
          }
        }
      }
    } else {
      hasChanged = true;
    }
    previous = dependencies;
    if (hasChanged || result === undefined) {
      result = callback(...dependencies);
    }
    return result;
  };
}
