import {StyleSheet, Platform} from 'react-native';
export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    height: 260,
    width: '100%',
  },
  modalBtnContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginTop: Platform.OS === 'ios' ? 7 : 15,
    marginBottom: Platform.OS === 'ios' ? 0 : 15,
  },
  datePicker: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? -10 : 0,
  },
  text: {
    width: '100%',
  },
  buttonDone: {
    marginLeft: Platform.OS === 'ios' ? 0 : 15,
  },
});
