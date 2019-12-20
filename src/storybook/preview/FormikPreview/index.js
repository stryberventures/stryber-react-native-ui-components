import React, {Fragment} from 'react';
import {View} from 'react-native';
import * as yup from 'yup';

import {Formik} from 'formik';
import {
  Button,
  Text,
  Checkbox,
  Switch,
  DatePicker,
  Dropdown,
  Input,
} from '../../../components';

const FormikPreview = () => {
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

  return (
    <View>
      <Formik
        initialValues={{
          email: '',
          password: '',
          checkbox: true,
          switch: true,
          date: new Date(),
          picker: 'Pear',
        }}
        /* eslint-disable-next-line no-console */
        onSubmit={values => console.log(values)}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Not a valid e-mail')
            .required('E-mail is required'),
          password: yup
            .string()
            .min(6)
            .required(),
        })}>
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          errors,
          setFieldTouched,
          touched,
        }) => (
          <Fragment>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange('email')}
              placeholder="Email"
              label="Email"
              email
              error={touched.email && errors.email}
              onBlur={() => setFieldTouched('email')}
            />
            <Input
              name="password"
              value={values.password}
              onChange={handleChange('password')}
              placeholder="Password"
              label="Password"
              secure
              error={touched.password && errors.password}
              onBlur={() => setFieldTouched('password')}
            />
            <Checkbox
              name="checkbox"
              value={values.checkbox}
              onPress={val => setFieldValue('checkbox', val)}
              text="Default checkbox"
            />
            <Switch
              name="switch"
              value={values.switch}
              onPress={val => setFieldValue('switch', val)}
              text="Switch"
            />
            <DatePicker
              name="date"
              label="Choose date"
              value={values.date}
              onChange={val => setFieldValue('date', val)}
            />
            <Dropdown
              name="picker"
              data={dropdownData}
              label="Pick fast"
              value={values.picker}
              onChange={handleChange('picker')}
            />
            <Button color="primary" onPress={handleSubmit}>
              <Text header white center bold>
                Form Submit
              </Text>
            </Button>
            <Text>{JSON.stringify(values)}</Text>
          </Fragment>
        )}
      </Formik>
    </View>
  );
};

export default FormikPreview;
