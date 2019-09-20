import React from "react";
import Card from "../components/Card";
import CenterView from '../components/CenterView';

import { storiesOf } from "@storybook/react-native";
import {linkTo} from "@storybook/addon-links";

storiesOf("Card", module)
  .addDecorator(getStory => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add("default", () => (
    <Card
      image={require("../assets/images/charizard.jpg")}
      text={"Charizard"}
      is_favorite={false}
      action={linkTo('Card','favorited')}
    />
  ))
  .add("favorited", () => (
    <Card
      image={require("../assets/images/charizard.jpg")}
      text={"Charizard"}
      is_favorite={true}
      action={linkTo('Card','default')}
    />
  ));
