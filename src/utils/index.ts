// @ts-ignore
export const handleMargin = (size: any) => {
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

// @ts-ignore
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
export function memoize(callback: any) {
  let previous: any;
  let result: any;
  return (...dependencies: any) => {
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

export const getDateTimeObj = (date: any) => {
  return {
    date,
    year: date ? date.getFullYear() : '',
    // @ts-ignore
    day: date ? `${date.getDate()}`.padStart(2, '0') : '',
    // @ts-ignore
    month: date ? `${date.getMonth() + 1}`.padStart(2, '0') : '',
    hours: date ? `${date.getHours()}` : '',
    // @ts-ignore
    minutes: date ? `${date.getMinutes()}`.padStart(2, '0') : '',
  };
};
