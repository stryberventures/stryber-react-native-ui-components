import React from 'react';
import {View} from 'react-native';

import {customHooks} from '../../../core';
import {
  Button,
  Text,
  Checkbox,
  Switch,
  DatePicker,
  Dropdown,
  Input,
} from '../../../components';

const Form = () => {
  const [values, handleChange] = customHooks.useForm({
    email: 'some@Mail',
    password: '123123',
    checkbox1: true,
    switch1: true,
    date: new Date(),
    picker: 'Pear',
  });
  const passwordRef = React.createRef();
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

  const showValues = () => console.log(values);
  return (
    <View>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        label="Email"
        email
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
        value={values.date}
        onChange={handleChange}
      />
      <Dropdown
        name="picker"
        data={dropdownData}
        label="Pick fast"
        value={values.picker}
        onChange={handleChange}
      />
      <Button color="primary" onPress={showValues}>
        <Text header white center bold>
          Form Submit
        </Text>
      </Button>
    </View>
  );
};

export default Form;
