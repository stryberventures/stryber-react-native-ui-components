export const tabView = `## TabView Usage

\`\`\`js
import {TabView, SceneMap} from '@stryberventures/stryber-react-native-ui-components';


() => (
  <TabView
    navigationState={{ index, routes }}
    onIndexChange={setIndex}
    renderScene={SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    })}
  />
);
\`\`\`

## Properties

| Prop                                                  | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **\`position\`**  | Animated value to listen to the position updates. The passed position value will be kept in sync with the current position of the tabs. It's useful for accessing the animated value outside the tab view.                                                           |
| **\`onSwipeStart\`**  | Callback which is called when the swipe gesture starts, i.e. the user touches the screen and moves it.                                           |
| **\`onSwipeEnd\`**  | Callback which is called when the swipe gesture ends, i.e. the user lifts their finger from the screen after the swipe gesture.                                            |
| **\`navigationState\`**  | State for the tab view. The state should contain the following properties: \`index\`: a number representing the index of the active route in the routes array and \`routes\`: an array containing a list of route objects used for rendering the tabs                                         |
| **\`lazy\`**  | Boolean indicating whether to lazily render the scenes. By default all scenes are rendered to provide a smoother swipe experience. But you might want to defer the rendering of unfocused scenes until the user sees them.                                                                                    |
| **\`lazyPreloadDistance\`**  | When lazy is enabled, you can specify how many adjacent routes should be preloaded with this prop. This value defaults to 0 which means lazy pages are loaded as they come into the viewport.                                                           |
| **\`renderLazyPlaceholder\`**  | Callback which returns a custom React Element to render for routes that haven't been rendered yet. Receives an object containing the route as the argument. The lazy prop also needs to be enabled.                                                          |
| **\`removeClippedSubviews\`**  | Boolean indicating whether to remove invisible views (such as unfocused screens) from the native view hierarchy to improve memory usage. Defaults to false                                                          |
| **\`keyboardDismissMode\`**  | String indicating whether the keyboard gets dismissed in response to a drag gesture. Possible values are: 'auto', 'on-drag', 'none'                                                          |
| **\`swipeEnabled\`**  | Boolean indicating whether to enable swipe gestures. Swipe gestures are enabled by default. Passing false will disable swipe gestures, but the user can still switch tabs by pressing the tab bar.                                                          |
| **\`swipeVelocityImpact\`**  | Determines how relevant is a velocity while calculating next position while swiping. Defaults to 0.2                                                          |
| **\`springVelocityScale\`**  | Number for determining how meaningful is gesture velocity for calculating initial velocity of spring animation. Defaults to 0                                                          |
| **\`timingConfig\`**  | Configuration object for the timing animation which occurs when tapping on tabs. Supported property is: duration                                                         |
| **\`springConfig\`**  | Configuration object for the spring animation which occurs after swiping. Supported properties are: damping, mass, stiffness, restSpeedThreshold, restDisplacementThreshold                                                          |
| **\`tabBarPosition\`**  | Position of the tab bar in the tab view. Possible values are 'top' and 'bottom'. Defaults to 'top'                                                          |
| **\`renderTabBar\`**  | Callback which returns a custom React Element to use as the tab bar                                                          |
| **\`renderScene\`**  | Callback which returns a react element to render as the page for the tab. Receives an object containing the route as the argument                                                          |
| **\`sceneContainerStyle\`**  | Style to apply to the view wrapping each screen. You can pass this to override some default styles such as overflow clipping                                                          |
| **\`style\`**  | Style to apply to the tab view container                                                          |
| **\`gestureHandlerProps\`**  | An object with props to be passed to underlying PanGestureHandler                                                          |
| **\`renderPager\`**  | Callback which returns a custom React Element to use as page                                                          |
| **\`initialLayout\`**  | Object containing the initial height and width of the screens. Passing this will improve the initial rendering performance. For most apps, this is a good default                                                          |
| **\`onIndexChange\`**  | Callback which is called on tab change, receives the index of the new tab as argument. The navigation state needs to be updated when it's called, otherwise the change is dropped.                                                          |

## Example

\`\`\`js
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import {TabView, Button, Text} from '@stryberventures/stryber-react-native-ui-components';

const renderScene = ({route, jumpTo}) => {
  switch (route.key) {
    case 'first':
      return <FirstRoute />;
    case 'second':
      return <SecondRoute jumpTo={jumpTo} />;
    case 'third':
      return <ThirdRoute />;
    case 'forth':
      return <ForthRoute />;
  }
};

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
);

const SecondRoute = props => {
  return (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <Button
        color="primary"
        style={{width: '100%'}}
        /* eslint-disable-next-line react/prop-types */
        onPress={() => props.jumpTo('first')}>
        <Text white bold center>
          Jump to first
        </Text>
      </Button>
    </View>
  );
};

const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab2'}]} />
);

const ForthRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#577ab9'}]} />
);

class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'First'},
      {key: 'second', title: 'Second'},
      {key: 'third', title: 'Third'},
    ],
  };

  handleIndexChange = index => this.setState({index});

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={renderScene}
        onIndexChange={this.handleIndexChange}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    marginBottom: 75,
  },
});
\`\`\``;
