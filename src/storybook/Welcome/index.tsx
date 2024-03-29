import * as React from 'react';
import {View, Text} from 'react-native';
interface IWelcomeProps {
  showApp?: (...args: any[]) => any;
}
export default class Welcome extends React.Component<IWelcomeProps, {}> {
  static defaultProps: any;
  styles = {
    wrapper: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    header: {
      fontSize: 18,
      marginBottom: 18,
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 18,
    },
  };
  showApp = (event: any) => {
    const {showApp} = this.props;
    event.preventDefault();
    if (showApp) {
      showApp();
    }
  };
  render() {
    return (
      // @ts-ignore
      <View style={this.styles.wrapper}>
        <Text style={this.styles.header}>Welcome to Stryber Style Guide</Text>
        <Text style={this.styles.content}>
          This is a UI Component development environment for your React Native
          app. Here you can display and interact with your UI components as
          stories. A story is a single state of one or more UI components. You
          can have as many stories as you want. In other words a story is like a
          visual test case.
        </Text>
        <Text style={this.styles.content}>
          We have added some stories inside the "storybook/stories" directory
          for examples. Try editing the "storybook/stories/Welcome.js" file to
          edit this message.
        </Text>
      </View>
    );
  }
}
Welcome.defaultProps = {
  showApp: null,
};
