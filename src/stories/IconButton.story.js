import React from "react";
import IconButton from "../components/IconButton";
import { storiesOf } from "@storybook/react-native";
import CenterView from '../components/CenterView';
import { linkTo } from '@storybook/addon-links';

storiesOf("IconButton", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("on", () => (
    <IconButton
      icon={"heart"}
      color={"#333"}
      onPress={linkTo('IconButton','off')}
    />
  ))
  .add("off", () => (
    <IconButton
      icon={"heart-o"}
      color={"#333"}
      onPress={linkTo('IconButton','on')}
    />
  ));
