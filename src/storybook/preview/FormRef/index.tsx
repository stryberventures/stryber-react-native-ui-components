import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Text,
  Checkbox,
  Switch,
  DatePicker,
  Dropdown,
  Input
} from "../../../components";
const FormRef = () => {
  const dropdownData = [
    {
      value: "Banana"
    },
    {
      value: "Mango"
    },
    {
      value: "Pear"
    },
    {
      value: "Cocoa"
    },
    {
      value: "Strawberry"
    },
    {
      value: "Apple"
    }
  ];
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const checkboxRef = React.createRef();
  const switchRef = React.createRef();
  const dateRef = React.createRef();
  const dropdownRef = React.createRef();
  const showValues = () =>
    // eslint-disable-next-line no-console
    console.log({
      login: emailRef.current.getValue(),
      password: passwordRef.current.getValue(),
      checkbox: checkboxRef.current.getValue(),
      switch: switchRef.current.getValue(),
      date: dateRef.current.getValue(),
      dropdown: dropdownRef.current.getValue()
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
      <Button onPress={showValues}>
        Form Submit
      </Button>
    </View>
  );
};
export default FormRef;
