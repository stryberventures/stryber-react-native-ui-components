import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  Modal,
  View,
  Button as RNButton,
} from 'react-native';
import {Calendar} from '../Icons';
import DateTimePicker from 'react-native-date-picker';
import styles from './styles';
import Input, {IInputProps} from '../Input';
import withTheme from '../withTheme';

interface IDatePickerProps extends React.HTMLAttributes<Element> {
  name?: string;
  mode?: 'date' | 'datetime' | 'time';
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
  };
  getValue = () => this.state.date;
  handlePressed = () => {
    this.setState(() => ({showModal: true}));
  };
  getDateTimeObj = () => {
    const {date} = this.state;
    return {
      date,
      year: date ? date.getFullYear() : '',
      day: date ? `${date.getDate()}`.padStart(2, '0') : '',
      month: date ? `${date.getMonth() + 1}`.padStart(2, '0') : '',
      hours: date ? `${date.getHours() }` : '',
      minutes: date ? `${date.getMinutes()}`.padStart(2, '0') : ''
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
  handleDateChange = (date: any) => {
    this.setState(
      prevState => ({
        date: date,
        startDate: date,
        showModal: prevState.showModal,
      })
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
      mode,
      minDate,
      maxDate,
      ...props
    } = this.props;
    return <Modal
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
            {/*//@ts-ignore */}
            <DateTimePicker
              style={styles.datePicker}
              mode={mode}
              date={date || startDate}
              onDateChange={this.handleDateChange}
              minimumDate={minDate}
              maximumDate={maxDate}
            />
          </View>
        </View>
      </Modal>
  };
  render() {
    const {showModal} = this.state;
    const {style, theme, label, error, variant, mode} = this.props;
    const {year, month, day, hours, minutes} = this.getDateTimeObj();
    const dateSet = day && month && year;
    const dateStr = dateSet
      ? `${day}-${month}-${year} ${mode === 'datetime' ? `${hours}:${minutes}`: ''}`
      : label;
    const inputColor = showModal ? theme.colors.primary : theme.colors.gray;
    return (
      <TouchableWithoutFeedback style={style} onPress={this.handlePressed}>
        <View pointerEvents="box-only">
          {this.renderModal()}
          <Input
            variant={variant}
            error={error}
            rightIcon={() => <Calendar size={20} fill={inputColor} />}
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
  modalButtonText: 'Done',
  name: 'datepicker',
  modalOverlayStyle: {},
  modalStyle: {},
  modalButtonStyle: {},
  modalBtnContainer: {},
  style: {},
  value: undefined,
  mode: 'date',
};
export default withTheme(DatePicker);
