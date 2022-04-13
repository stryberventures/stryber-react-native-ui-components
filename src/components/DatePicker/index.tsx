import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  Modal,
  View,
  Button as RNButton,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Calendar} from '../Icons';
import DateTimePicker from 'react-native-date-picker';
import styles from './styles';
import Input, {IInputProps} from '../Input';
import {useTheme} from '../Theme';
import {getDateTimeObj} from '../../utils';

interface IDatePickerCommon {
  name?: string;
  mode?: 'date' | 'datetime' | 'time';
  startDate?: Date;
  onDateSelected?: (name: string, date: Date) => void;
  onClose?: () => void;
  minDate?: Date;
  maxDate?: Date;
  modalButtonSelectText?: string;
  modalButtonCloseText?: string;
  modalOverlayStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  modalBtnContainerStyle?: StyleProp<ViewStyle>;
  saveDateOnCancel?: boolean;
  showDateModal?: boolean;
  modalMode?: boolean;
}

type DatePickerModalVariantType =
  | {
      modalMode?: true;
      inputStyle?: never;
      variant?: never;
      error?: never;
      iconSize?: never;
      icon?: never;
      onPress?: never;
      inputBoxStyle?: never;
      label?: never;
      style?: never;
      placeholderTextColor?: never;
      textColor?: never;
    }
  | {
      modalMode?: false;
      inputStyle?: IInputProps['inputStyle'];
      variant?: IInputProps['variant'];
      error?: string;
      iconSize?: number;
      icon?: (...args: any[]) => any;
      onPress?: () => void;
      inputBoxStyle?: IInputProps['inputBoxStyle'];
      label?: string;
      style?: StyleProp<ViewStyle>;
      placeholderTextColor?: string;
      textColor?: string;
    };

export type DatePickerType = IDatePickerCommon & DatePickerModalVariantType;

const DatePicker = ({
  style,
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
  showDateModal,
  icon,
  startDate,
  name,
  onDateSelected,
  onClose,
  modalBtnContainerStyle,
  modalButtonCloseText,
  modalButtonSelectText,
  modalOverlayStyle,
  modalStyle,
  onPress,
  maxDate,
  minDate,
}: DatePickerType) => {
  const {theme} = useTheme();
  const [date, setDate] = useState(startDate);
  const [showModal, setShowModal] = useState(false);
  const {year, month, day, hours, minutes} = getDateTimeObj(date);
  const dateSet = day && month && year;
  const valueFormat = {
    date: `${day}-${month}-${year}`,
    time: `${hours}:${minutes}`,
    datetime: `${day}-${month}-${year} ${hours}:${minutes}`,
  };
  const dateStr = dateSet ? valueFormat[mode] : label;
  const placeholderColor = showDateModal
    ? theme.colors.primary
    : placeholderTextColor
    ? placeholderTextColor
    : theme.colors.gray;
  const inputColor = textColor ? textColor : theme.colors.darkGrey;

  const handlePress = () => {
    setShowModal(true);
    onPress!();
  };

  const handleModalSetDate = () => {
    onDateSelected!(name!, date!);
    setShowModal(false);
    onClose && onClose();
  };

  const handleModalClose = () => {
    setShowModal(false);
    onClose && onClose();
  };

  const handleDateChange = (dateVal: any) => setDate(dateVal);

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent
      visible={!modalMode ? showModal : showDateModal}
      onRequestClose={handleModalClose}>
      <View style={[styles.overlay, modalOverlayStyle]}>
        <View style={[styles.modal, modalStyle]}>
          <View style={[styles.modalBtnContainer, modalBtnContainerStyle]}>
            <View style={[modalBtnContainerStyle]}>
              <RNButton
                title={modalButtonCloseText!}
                onPress={handleModalClose}
              />
            </View>
            <View style={[modalBtnContainerStyle, styles.buttonDone]}>
              <RNButton
                title={modalButtonSelectText!}
                onPress={handleModalSetDate}
              />
            </View>
          </View>
          <DateTimePicker
            style={styles.datePicker}
            mode={mode}
            date={date}
            onDateChange={handleDateChange}
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        </View>
      </View>
    </Modal>
  );

  if (modalMode) {
    return renderModal();
  }

  return (
    <TouchableWithoutFeedback style={style} onPress={handlePress}>
      <View pointerEvents="box-only">
        {renderModal()}
        <Input
          inputStyle={inputStyle}
          variant={variant}
          error={error}
          rightIcon={
            icon
              ? icon
              : () => (
                  <Calendar
                    height={iconSize}
                    width={iconSize}
                    fill={placeholderColor}
                  />
                )
          }
          placeholder={dateStr}
          style={[{marginVertical: 0}]}
          inputBoxStyle={inputBoxStyle}
          placeholderTextColor={
            dateSet && !showDateModal ? inputColor : placeholderColor
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

DatePicker.defaultProps = {
  startDate: new Date(),
  onDateSelected: () => {},
  onClose: () => {},
  onPress: () => {},
  modalButtonSelectText: 'Done',
  modalButtonCloseText: 'Cancel',
  name: 'datepicker',
  modalOverlayStyle: {},
  modalStyle: {},
  modalBtnContainerStyle: {},
  style: {},
  mode: 'date',
  iconSize: 20,
  modalMode: false,
  showDateModal: false,
};

export default DatePicker;
