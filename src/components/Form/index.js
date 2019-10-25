import React from 'react';
import {View} from 'react-native';

import {customHooks} from '../../core';
import Input from '../Input';

const Form = () => {
  const [values, handleChange] = customHooks.useForm({email: '', password: ''});
  const passwordRef = React.createRef();
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
    </View>
  );
};

export default Form;
