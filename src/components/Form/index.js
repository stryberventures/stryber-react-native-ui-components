import React from 'react';
import {View} from 'react-native';

import {customHooks} from '../../utils';
import Input from '../Input';

const Form = () => {
  const [values, handleChange] = customHooks.useForm({email: '', password: ''});
  return (
    <View>
      <Input
        style={{width: 250}}
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <Input
        style={{width: 250}}
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
    </View>
  );
};

export default Form;
