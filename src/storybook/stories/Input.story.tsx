import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, text } from "@storybook/addon-knobs";
import Input from "../../components/Input";
import CenterView from "../../components/CenterView";
import { UserIcon } from "../../components/Icons";
import { input } from "../../static/markdown";
const placeholder = text("Placeholder", "Input placeholder");
storiesOf("Input", module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: { markdown: input }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("disabled", () => {
    return (
      <Input placeholder={placeholder} type="email" label="Email" disabled />
    );
  })
  .add("default", () => {
    const testRef = React.createRef();
    return (
      <Input
        onFocus={linkTo("Input", "focused")}
        placeholder={placeholder}
        type="email"
        label="Email"
        variant="lined"
        ref={testRef}
      />
    );
  })
  .add("focused", () => (
    <Input label="Email" multiline numberOfLines={5}  variant="lined" placeholder={placeholder} type="email" />
  ))
  .add("with default value", () => {
    return (
      <Input
        placeholder={placeholder}
        value="Default value"
        type="email"
        label="Email"
      />
    );
  })
  .add("with error", () => (
    <Input
      label="Email"
      value="Wrong text"
      error="Error text"
      placeholder={placeholder}
      type="email"
    />
  ))
  .add("with mask", () => (
    <Input
      label="Card date"
      number
      placeholder={placeholder}
      type="card"
      mask="XX/XX"
      maxLength={5}
    />
  ))
  .add("with icon", () => (
    <Input
      email
      withLeftBorder={false}
      placeholder={placeholder}
      icon={() => <UserIcon />}
    />
  ))
  .add("with icon disabled", () => (
    <Input
      email
      withLeftBorder={false}
      disabled
      placeholder={placeholder}
      icon={() => <UserIcon />}
    />
  ))
  .add("with icon error", () => (
    <Input
      email
      withLeftBorder={false}
      error="Error text"
      placeholder={placeholder}
      icon={() => <UserIcon />}
    />
  ))
  .add("password", () => <Input secure placeholder={placeholder} />)
  .add("multiline disabled", () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        disabled
        multiline
      />
    );
  })
  .add("multiline default", () => {
    const testRef = React.createRef();
    return (
      <Input
        onFocus={linkTo("Input", "multiline focused")}
        placeholder={placeholder}
        type="email"
        label="Email"
        ref={testRef}
        multiline
      />
    );
  })
  .add("multiline focused", () => (
    <Input label="Email" multiline placeholder={placeholder} type="email" autoFocus />
  ))
  .add("multiline with default value", () => {
    return (
      <Input
        placeholder={placeholder}
        value="Default value"
        type="email"
        label="Email"
        multiline
      />
    );
  })
  .add("multiline with error", () => (
    <Input
      label="Email"
      value="Wrong text"
      error="Error text"
      placeholder={placeholder}
      type="email"
      multiline
    />
  ))
  .add("multiline with mask", () => (
    <Input
      label="Card date"
      number
      placeholder={placeholder}
      type="card"
      mask="XX/XX"
      maxLength={5}
      multiline
    />
  ))
  .add("multiline with icon", () => (
    <Input
      email
      withLeftBorder={false}
      placeholder={placeholder}
      icon={() => <UserIcon />}
      multiline
    />
  ))
  .add("multiline with icon disabled", () => (
    <Input
      email
      withLeftBorder={false}
      disabled
      placeholder={placeholder}
      icon={() => <UserIcon />}
      multiline
    />
  ))
  .add("multiline with icon error", () => (
    <Input
      email
      withLeftBorder={false}
      error="Error text"
      placeholder={placeholder}
      icon={() => <UserIcon />}
      multiline
    />
  ));
