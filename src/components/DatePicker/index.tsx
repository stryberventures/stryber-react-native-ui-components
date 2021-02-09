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
  showModal?: boolean;
  modalMode?: boolean;
  placeholderTextColor?: string;
  textColor?: string;
  inputStyle?: any;
  iconSize?: number;
  inputBoxStyle?: any;
  icon?: (...args: any[]) => any;
}
type DatePickerState = {
  date?: any;
  showModal?: boolean;
};
class DatePicker extends Component<IDatePickerProps, DatePickerState> {
  static defaultProps: any;
  state = {
    showModal: this.props.showModal || false,
    date: this.props.value || undefined,
  };
  getValue = () => this.state.date;
  showModal = () => {
    this.setState(() => ({showModal: true}));
  };
  handlePressed = () => {
    this.showModal();
  };
  getDateTimeObj = () => {
    const {date} = this.state;
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
    this.setState(prevState => ({
      date: date,
      startDate: date,
      showModal: prevState.showModal,
    }));
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
    return (
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
                // @ts-ignore
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
    );
  };
  render() {
    const {showModal} = this.state;
    const {
      style,
      theme,
      label,
      error,
      variant,
      mode = 'date',
      placeholderTextColor,
      textColor,
      inputStyle,
      iconSize,
      inputBoxStyle,
      modalMode,
      icon,
    } = this.props;
    const {year, month, day, hours, minutes} = this.getDateTimeObj();
    const dateSet = day && month && year;
    const valueFormat = {
      date: `${day}-${month}-${year}`,
      time: `${hours}:${minutes}`,
      datetime: `${day}-${month}-${year} ${hours}:${minutes}`
    };
    const dateStr = dateSet
      ? valueFormat[mode]
      : label;
    const placeholderColor = showModal
      ? theme.colors.primary
      : placeholderTextColor
      ? placeholderTextColor
      : theme.colors.gray;
    const inputColor = textColor ? textColor : theme.colors.darkGrey;

    if (modalMode) {
      return this.renderModal();
    }

    return (
      <TouchableWithoutFeedback style={style} onPress={this.handlePressed}>
        <View pointerEvents="box-only">
          {this.renderModal()}
          <Input
            inputStyle={inputStyle}
            variant={variant}
            error={error}
            rightIcon={icon ? icon
              : () => (<Calendar size={iconSize} fill={placeholderColor} />)}
            placeholder={dateStr}
            style={[{marginVertical: 0}, style]}
            inputBoxStyle={inputBoxStyle}
            placeholderTextColor={
              dateSet && !showModal ? inputColor : placeholderColor
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
  iconSize: 20,
  modalMode: false,
};
export default withTheme(DatePicker);
