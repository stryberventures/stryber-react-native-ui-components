import React, {Component} from 'react';
import {
  Platform,
  TouchableWithoutFeedback,
  Modal,
  View,
  ViewPropTypes,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

import styles from './styles';
import Input from '../Input';
import withTheme from '../withTheme';

const isAndroid = Platform.OS === 'android';

class DatePicker extends Component {
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

        onChange({name, value: this.state.date});
      },
    );
  };

  handleDateChange = (e, date) => {
    this.setState(
      prevState => ({
        date,
        startDate: date,
        showModal: isAndroid ? false : prevState.showModal,
      }),
      () => {
        if (isAndroid) {
          const {onChange, name} = this.props;

          onChange(this.state.date, name);
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
              <Button
                style={[modalButtonStyle]}
                title={modalButtonText}
                onPress={this.handleModalClose}
              />
            </View>
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
    const {style, theme, label, error, withLeftBorder} = this.props;
    const {year, month, day} = this.getDateObj();
    const dateSet = day && month && year;
    const dateStr = dateSet ? `${day}-${month}-${year}` : label;
    const inputColor = showModal ? theme.colors.primary : theme.colors.gray;

    return (
      <TouchableWithoutFeedback style={style} onPress={this.handlePressed}>
        <View pointerEvents="box-only">
          {this.renderModal()}
          <Input
            error={error}
            rightLabel={() => (
              <Icon name="calendar" size={20} color={inputColor} />
            )}
            placeholderLabel={dateStr}
            onPress={this.handlePressed}
            style={[{marginVertical: 0}, style]}
            placeholderTextColor={
              dateSet && !showModal ? theme.colors.darkGrey : inputColor
            }
            borderColor={inputColor}
            withLeftBorder={withLeftBorder}
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

DatePicker.propTypes = {
  name: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  modalButtonText: PropTypes.string,
  modalOverlayStyle: ViewPropTypes.style,
  modalStyle: ViewPropTypes.style,
  modalButtonStyle: ViewPropTypes.style,
  modalBtnContainer: ViewPropTypes.style,
  style: ViewPropTypes.style,
  value: PropTypes.instanceOf(Date),
  theme: PropTypes.shape({}).isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  withLeftBorder: PropTypes.boolean,
};

export default withTheme(DatePicker);
