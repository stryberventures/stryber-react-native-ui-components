import React, {Component} from 'react';
import {
  Platform,
  TouchableWithoutFeedback,
  Modal,
  View,
  Button as RNButton,
} from 'react-native';
import {Calendar} from '../Icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import Input, {IInputProps} from '../Input';
import Button from '../Button';
import withTheme from '../withTheme';
const isAndroid = Platform.OS === 'android';
interface IDatePickerProps extends React.HTMLAttributes<Element> {
  name?: string;
  startDate?: any;
  onChange?: (...args: any[]) => any;
  minDate?: any;
  maxDate?: any;
  modalButtonText?: string;
  modalOverlayStyle?: any;
  modalStyle?: any;
  modalButtonStyle?: any;
  modalBtnContainer?: any;
  style?: any;
  value?: any;
  theme?: any;
  label?: string;
  error?: string;
  variant?: IInputProps['variant'];
  props?: any;
  saveDateOnCancel?: boolean;
}
type DatePickerState = {
  date?: any;
  showModal?: boolean;
};
class DatePicker extends Component<IDatePickerProps, DatePickerState> {
  static defaultProps: any;
  state = {
    showModal: false,
    date: this.props.value || undefined,
    showAndroidModal: true,
  };
  getValue = () => this.state.date;
  handlePressed = () => {
    this.setState(() => ({showModal: true}));
  };
  getDateObj = () => {
    const {date} = this.state;
    return {
      date,
      year: date ? date.getFullYear() : '',
      day: date ? `${date.getDate()}`.padStart(2, '0') : '',
      month: date ? `${date.getMonth() + 1}`.padStart(2, '0') : '',
    };
  };
  handleModalClose = () => {
    this.setState(
      () => ({showModal: false}),
      () => {
        const {onChange, name} = this.props;
        onChange!({name, value: this.state.date});
      },
    );
  };
  handleDateChange = (_: any, date: any) => {
    const {saveDateOnCancel} = this.props;
    this.setState(
      prevState => ({
        date: !date && saveDateOnCancel && isAndroid ? prevState.date : date,
        startDate:
          !date && saveDateOnCancel && isAndroid ? prevState.date : date,
        showModal: isAndroid ? false : prevState.showModal,
      }),
      () => {
        if (isAndroid) {
          const {onChange, name} = this.props;
          onChange!(this.state.date, name);
        }
      },
    );
  };
  renderModal = () => {
    const {showModal, date} = this.state;
    const {
      startDate,
      modalOverlayStyle,
      modalStyle,
      modalBtnContainer,
      modalButtonStyle,
      modalButtonText,
      ...props
    } = this.props;
    return isAndroid ? (
      showModal && (
        // @ts-ignore
        <DateTimePicker
          mode="date"
          is24Hour={true}
          display="default"
          {...props}
          value={date || startDate}
          onChange={this.handleDateChange}
        />
      )
    ) : (
      <Modal
        animationType="slide"
        transparent
        visible={showModal}
        onRequestClose={this.handleModalClose}>
        <View style={[styles.overlay, modalOverlayStyle]}>
          <View style={[styles.modal, modalStyle]}>
            <View style={[styles.modalBtnContainer, modalBtnContainer]}>
              <RNButton
                // @ts-ignore
                title={modalButtonText}
                style={[modalButtonStyle]}
                onPress={this.handleModalClose}
              />
            </View>
            {/*
  // @ts-ignore */}
            <DateTimePicker
              mode="date"
              is24Hour={true}
              display="default"
              {...props}
              value={date || startDate}
              onChange={this.handleDateChange}
            />
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    const {showModal} = this.state;
    const {style, theme, label, error, variant} = this.props;
    const {year, month, day} = this.getDateObj();
    const dateSet = day && month && year;
    const dateStr = dateSet ? `${day}-${month}-${year}` : label;
    const inputColor = showModal ? theme.colors.primary : theme.colors.gray;
    return (
      <TouchableWithoutFeedback style={style} onPress={this.handlePressed}>
        <View pointerEvents="box-only">
          {this.renderModal()}
          <Input
            variant={variant}
            error={error}
            rightIcon={() => (
              <Button onPress={() => {}}>
                <Calendar size={20} fill={inputColor} />
              </Button>
            )}
            placeholder={dateStr}
            style={[{marginVertical: 0}, style]}
            placeholderTextColor={
              dateSet && !showModal ? theme.colors.darkGrey : inputColor
            }
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
DatePicker.defaultProps = {
  startDate: new Date(),
  onChange: () => {},
  maxDate: new Date(32519532187368),
  minDate: new Date(0),
  modalButtonText: 'Done',
  name: 'datepicker',
  modalOverlayStyle: {},
  modalStyle: {},
  modalButtonStyle: {},
  modalBtnContainer: {},
  style: {},
  value: undefined,
  label: '',
  error: '',
};
export default withTheme(DatePicker);
