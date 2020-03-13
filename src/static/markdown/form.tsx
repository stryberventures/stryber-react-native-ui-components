export const form = `## Examples of form usages

### Example of usage with hooks

\`\`\`js
import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Text,
  Checkbox,
  Switch,
  DatePicker,
  Dropdown,
  Input,
} from '@stryberventures/stryber-react-native-ui-components';

const useForm = (initialValues) => {
          const [values, setValues] = useState(initialValues);

          return [
            values,
            (value, name) => {
              setValues({
                ...values,
                [name]: value,
              });
            },
          ];
        }

const FormWithHooks = () => {
  const [values, handleChange] = useForm({
    email: 'some@Mail',
    password: '123123',
    checkbox1: true,
    switch1: true,
    date: new Date(),
    picker: 'Pear',
  });
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
      />
      <Input
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
        label="Password"
        secure
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

export default FormWithHooks;
\`\`\`

### Example of usage with formik and yup

\`\`\`js
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
} from '@stryberventures/stryber-react-native-ui-components';

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
\`\`\`

### Example of usage with react refs

\`\`\`js
const FormRef = () => {
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

  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const checkboxRef = React.createRef();
  const switchRef = React.createRef();
  const dateRef = React.createRef();
  const dropdownRef = React.createRef();

  const showValues = () =>
    console.log({
      login: emailRef.current.getValue(),
      password: passwordRef.current.getValue(),
      checkbox: checkboxRef.current.getValue(),
      switch: switchRef.current.getValue(),
      date: dateRef.current.getValue(),
      dropdown: dropdownRef.current.getValue(),
    });
  return (
    <View>
      <Input
        name="email"
        value=""
        placeholder="Email"
        label="Email"
        email
        ref={emailRef}
      />
      <Input
        name="password"
        value=""
        placeholder="Password"
        label="Password"
        secure
        ref={passwordRef}
      />
      <Checkbox name="checkbox1" text="Default checkbox" ref={checkboxRef} />
      <Switch name="switch1" text="Switch" ref={switchRef} />
      <DatePicker name="date" label="Choose date" ref={dateRef} />
      <Dropdown
        name="picker"
        data={dropdownData}
        label="Pick fast"
        ref={dropdownRef}
      />
      <Button color="primary" onPress={showValues}>
        <Text header white center bold>
          Form Submit
        </Text>
      </Button>
    </View>
  );
};

export default FormRef;
\`\`\``;
