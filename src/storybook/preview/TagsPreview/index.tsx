import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text, Tags
} from '../../../components';

const tagsArr = [
  { id: 1, label: 'JavaScript' },
  { id: 2, label: 'React' },
  { id: 4, label: 'HTML' },
  { id: 5, label: 'CSS' },
  { id: 6, label: 'React Native' },
  { id: 7, label: 'Vue' }
];
interface IProps {
  withCross?: boolean;
  size: 'large' | 'small';
  color?: string;
  textColor?: string;
}
export default class TagsPreview extends React.Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text bold>Rectangle</Text>
          <Tags shape="rectangle" tags={tagsArr} {...this.props}/>
        </View>
        <View style={styles.wrapper}>
          <Text bold>Rounded</Text>
          <Tags shape="rounded" tags={tagsArr} {...this.props}/>
        </View>
        <View style={styles.wrapper}>
          <Text bold>Round</Text>
          <Tags shape="round" tags={tagsArr} {...this.props}/>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    marginTop: 20,
  },
});
