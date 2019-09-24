import {StyleSheet} from 'react-native';

import {pixelToDp, pixelFontToDp} from '../../utils';

export default StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
    paddingTop: 14,
  },
  textInput: {
    width: '100%',
    borderBottomWidth: pixelToDp(1),
    fontSize: pixelFontToDp(15),
    borderBottomColor: '#A1A1A1',
    paddingBottom: 10,
    paddingTop: 10,
  },
  textInputFocused: {
    borderBottomWidth: pixelToDp(1),
    borderBottomColor: 'transparent',
  },
  textInputDisabled: {
    color: '#c3c3c3',
  },
  placeholderText: {
    fontSize: pixelFontToDp(15),
    color: '#A1A1A1',
  },
  placeholderAnimatedText: {
    color: '#78AC9F',
    fontSize: 12,
  },
  focusUnderline: {
    width: '100%',
    bottom: pixelToDp(0),
    borderBottomWidth: pixelToDp(1),
    borderBottomColor: '#78AC9F',
  },
  placeholder: {
    position: 'absolute',
    top: 23,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
  accessory: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 18,
  },
});
