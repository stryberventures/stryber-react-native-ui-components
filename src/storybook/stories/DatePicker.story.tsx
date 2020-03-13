import * as React from "react";
import { DatePicker } from "../../components";
import CenterView from "../../components/CenterView";
import { storiesOf } from "@storybook/react-native";
import { datePicker } from "../../static/markdown";
storiesOf("DatePicker", module)
  .addParameters({
    notes: { markdown: datePicker }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("default", () => {
    return <DatePicker label="Choose date" />;
  });
