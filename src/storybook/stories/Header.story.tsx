import * as React from "react";
import { SafeAreaView } from "react-native";
import { storiesOf } from "@storybook/react-native";
import Header from "../../components/Header";
import AnimatedHeader from "../../components/AnimatedHeader";
import { header } from "../../static/markdown/header";
storiesOf("Header", module)
  .addParameters({
    notes: { markdown: header }
  })
  .addDecorator(getStory => <SafeAreaView>{getStory()}</SafeAreaView>)
  .add("default", () => {
    return <Header text="Test" />;
  })
  .add("with icons", () => {
    return (
      <Header
        text="Test"
      />
    );
  })
  .add("animated", () => {
    return <AnimatedHeader />;
  });
