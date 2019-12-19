import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {UserIcon, Eye, Search, ArrowDown} from '../../../components/Icons';

import {TabView, SceneMap, TabBar, Button, Text} from '../../../components';

// eslint-disable-next-line react/prop-types
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

const FifthRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#666abb'}]} />
);

const SixthRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#247ab7'}]} />
);

export class ScrollTabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'First'},
      {key: 'second', title: 'Second'},
      {key: 'third', title: 'Third'},
      {key: 'forth', title: 'Forth'},
      {key: 'fifth', title: 'Fifth'},
      {key: 'sixth', title: 'Sixth'},
    ],
  };

  handleIndexChange = index => this.setState({index});

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
          forth: ForthRoute,
          fifth: FifthRoute,
          sixth: SixthRoute,
        })}
        onIndexChange={this.handleIndexChange}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.container}
        renderTabBar={props => <TabBar scrollEnabled {...props} />}
      />
    );
  }
}

export class TabViewExample extends React.Component {
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

export class TabViewBottomIconExample extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', icon: UserIcon},
      {key: 'second', icon: Search},
      {key: 'third', icon: Eye},
      {key: 'forth', icon: ArrowDown},
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
        style={styles.bottomContainer}
        tabBarPosition="bottom"
        renderTabBar={props => (
          <TabBar
            renderIcon={({route, focused, color}) => (
              <route.icon height={40} fill={color} />
            )}
            {...props}
          />
        )}
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
