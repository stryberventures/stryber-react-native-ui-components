import initStoryshots from "@storybook/addon-storyshots";

jest.mock("global", () => Object.assign(global, { window: { STORYBOOK_HOOKS_CONTEXT: "" } }));

describe("storybook tests", () => {
  initStoryshots({
    configPath: "./src",
    framework: "react-native"
  })
});
