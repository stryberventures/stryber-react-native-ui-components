import React from 'react';
import {View} from 'react-native';

import {customHooks} from '../../core';
import Input from '../Input';

const Form = () => {
  const [values, handleChange] = customHooks.useForm({email: '', password: ''});
  return (
    <View>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <Input
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
    </View>
  );
};

export default Form;
