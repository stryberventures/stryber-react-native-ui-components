import {StyleSheet} from 'react-native';

import {defaultTheme as theme} from '../other/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    overflow: 'scroll',
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
      width: 0,
    },
    zIndex: 1,
    marginBottom: theme.spaces.xxl2,
  },
  segmentView: {
    backgroundColor: theme.colors.paleBlueGray,
    borderRadius: theme.spaces.xxs,
    paddingHorizontal: theme.spaces.xxs,
  },
  tabContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  indicatorBottomLine: {
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.black,
    position: 'absolute',
    bottom: 0,
    opacity: 0.05,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
  },
});
