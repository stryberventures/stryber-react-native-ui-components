import * as React from "react";
import {
  ScrollTabViewExample,
  TabViewExample,
  TabViewBottomIconExample
} from "../preview/TabViewPreview";
import { storiesOf } from "@storybook/react-native";
import { tabView } from "../../static/markdown";
storiesOf("TabView", module)
  .addParameters({
    notes: { markdown: tabView }
  })
  .add("default", () => <TabViewExample />)
  .add("with scroll", () => <ScrollTabViewExample />)
  .add("with icons at bottom", () => <TabViewBottomIconExample />);
