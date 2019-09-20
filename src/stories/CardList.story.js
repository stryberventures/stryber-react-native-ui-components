import React from "react";
import { storiesOf } from "@storybook/react-native";

import SafeArea from  "../components/SafeArea";
import Provider from "../components/Provider";
import CardList from "../components/CardList";

storiesOf("CardList", module)
  .addDecorator(getStory => <SafeArea><Provider>{getStory()}</Provider></SafeArea>)
  .add("with cards", () => {
    return <CardList />;
  });
