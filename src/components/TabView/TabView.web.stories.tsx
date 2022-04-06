import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import TabView from './index';
import {tabView} from '../../static/markdown';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../index';

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

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
);
const SecondRoute = props => {
  return (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <Button style={{width: '100%'}} onPress={() => props.jumpTo('first')}>
        Jump to first
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
    default:
      return <FirstRoute />;
  }
};

const routes = [
  {key: 'first', title: 'First'},
  {key: 'second', title: 'Second'},
  {key: 'third', title: 'Third'},
];

export default {
  title: 'TabView',
  component: TabView,
  parameters: {
    notes: {tabView},
  },
} as ComponentMeta<typeof TabView>;

export const Default: ComponentStory<typeof TabView> = args => {
  const [index, setIndex] = useState(1);
  const handleIndexChange = (idx: number) => setIndex(idx);

  return (
    <TabView
      {...args}
      navigationState={{index, routes}}
      onIndexChange={handleIndexChange}
    />
  );
};

Default.args = {
  renderScene,
  style: styles.container,
};
