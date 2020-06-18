import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import TagsPreview from "../preview/TagsPreview";
import CenterView from "../../components/CenterView";
import { tags } from "../../static/markdown";

storiesOf("Tags", module)
  .addDecorator(getStory => <CenterView middle>{getStory()}</CenterView>)
  .add(
    'small',
    () => <TagsPreview size="small"/>,
    { notes: { markdown: tags } }
  ).add(
    'large',
    () => <TagsPreview size="large"/>).add(
    'with cross',
    () => <TagsPreview size="small" withCross/>);
