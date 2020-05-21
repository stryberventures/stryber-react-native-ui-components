import {StyleSheet} from 'react-native';

import * as theme from '../other/constants/theme';

export default StyleSheet.create({
  label: {
    margin: 4,
    backgroundColor: 'transparent',
    fontSize: theme.fontSizes.subhead,
    textAlign: 'center',
  },
  labelWrapper: {
    justifyContent: 'center',
  },
  segmentLabelWrapper: {
    flexDirection: 'row',
    borderRadius: theme.spaces.xxs,
    height: '90%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentBorder: {
    width: 1,
    height: '50%',
  },
  icon: {
    margin: 2,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    minHeight: 48,
  },
  segmentItem: {
    padding: 0,
    minHeight: theme.spaces.xxl2,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
