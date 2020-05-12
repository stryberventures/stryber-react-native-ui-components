import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Dropdown from "../../components/Dropdown";
import CenterView from "../../components/CenterView";
import { dropdown } from "../../static/markdown";
storiesOf("Dropdown", module)
  .addParameters({
    notes: { markdown: dropdown }
  })
  .add("default", () => {
    return (
      <CenterView>
        <Dropdown
          label="Fruit"
          placeholder="Choose item..."
          data={[
            {
              value: "Banana",
              label: "Babana",
            },
            {
              value: "Mango",
              label: "Mango",
            },
            {
              value: "Pear",
              label: "Pear",
            },
            {
              value: "Cocoa",
              label: "Cocoa",
            },
            {
              value: "Cherry",
              label: "Cherry",
            },
          ]}
        />
      </CenterView>
    );
  })
  .add("bottom", () => {
    return (
      <CenterView bottom>
        <Dropdown
          data={[
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
              value: "Cherry"
            }
          ]}
        />
      </CenterView>
    );
  })
  .add("width", () => {
    return (
      <CenterView>
        <Dropdown
          label="Age"
          containerStyle={{ width: 100 }}
          data={[
            {
              value: "10+"
            },
            {
              value: "12+"
            },
            {
              value: "16+"
            },
            {
              value: "20+"
            },
            {
              value: "30+"
            }
          ]}
        />
      </CenterView>
    );
  });
