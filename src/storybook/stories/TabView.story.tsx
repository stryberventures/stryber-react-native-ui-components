import * as React from "react";
import {
  ScrollTabViewExample,
  TabViewExample,
  TabViewBottomIconExample,
  SegmentViewExample,
} from "../preview/TabViewPreview";
import { storiesOf } from "@storybook/react-native";
import { tabView } from "../../static/markdown";
storiesOf("TabView", module)
  .addParameters({
    notes: { markdown: tabView }
  })
  .add("default", () => <TabViewExample />)
  .add("segment view", () => <SegmentViewExample />)
  .add("with scroll", () => <ScrollTabViewExample />)
  .add("with icons at bottom", () => <TabViewBottomIconExample />);
