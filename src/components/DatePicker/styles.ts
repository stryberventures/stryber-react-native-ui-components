import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {backgroundColor: '#fff', height: 260, width: '100%'},
  modalBtnContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  container: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderRadius: 2,
    height: 50,
  },
  placeholderText: {},
  text: {
    width: '100%',
  },
});
