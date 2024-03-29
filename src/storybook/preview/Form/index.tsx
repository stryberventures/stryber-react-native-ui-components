import * as React from 'react';
import {View} from 'react-native';
import {customHooks} from '../../../core';
import {
  Button,
  Checkbox,
  Switch,
  DatePicker,
  Dropdown,
  Input,
} from '../../../index';
const Form = () => {
  const [values, handleChange] = customHooks.useForm({
    email: 'some@Mail',
    password: '123123',
    checkbox1: true,
    switch1: true,
    date: new Date(),
    picker: 'Pear',
  });
  const passwordRef = React.createRef<any>();
  const dropdownData = [
    {
      value: 'Banana',
    },
    {
      value: 'Mango',
    },
    {
      value: 'Pear',
    },
    {
      value: 'Cocoa',
    },
    {
      value: 'Strawberry',
    },
    {
      value: 'Apple',
    },
  ];
  // eslint-disable-next-line no-console
  const showValues = () => console.log(values);
  return (
    <View>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        label="Email"
        type="email"
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <Input
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
        label="Password"
        secure
        ref={passwordRef}
      />
      <Checkbox
        name="checkbox1"
        value={values.checkbox1}
        onPress={handleChange}
        text="Default checkbox"
      />
      <Switch
        name="switch1"
        value={values.switch1}
        onPress={handleChange}
        text="Switch"
      />
      <DatePicker
        name="date"
        label="Choose date"
        startDate={values.date}
        onDateSelected={handleChange}
        saveDateOnCancel
        modalMode={false}
      />
      <Dropdown
        name="picker"
        data={dropdownData}
        label="Pick fast"
        value={values.picker}
        onChange={handleChange}
      />
      <Button onPress={showValues}>Form Submit</Button>
    </View>
  );
};
export default Form;
