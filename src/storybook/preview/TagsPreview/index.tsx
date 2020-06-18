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
  size: 'large' | 'small'
}
export default class TagsPreview extends React.Component<IProps> {
  render() {
    const {size, withCross} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text bold>Rectangle</Text>
          <Tags size={size} shape="rectangle" tags={tagsArr} withCross={withCross}/>
        </View>
        <View style={styles.wrapper}>
          <Text bold>Rounded</Text>
          <Tags size={size} shape="rounded" tags={tagsArr} withCross={withCross}/>
        </View>
        <View style={styles.wrapper}>
          <Text bold>Round</Text>
          <Tags size={size} shape="round" tags={tagsArr} withCross={withCross}/>
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
