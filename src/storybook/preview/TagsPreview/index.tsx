import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Tags} from '../../../index';

const tagsArrWithoutPreselectedValues = [
  {id: 1, label: 'JavaScript'},
  {id: 2, label: 'React'},
  {id: 4, label: 'HTML'},
  {id: 5, label: 'CSS'},
  {id: 6, label: 'React Native'},
  {id: 7, label: 'Vue'},
];
const tagsArrWithPreselectedValues = [
  {id: 1, label: 'JavaScript'},
  {id: 2, label: 'React', preselected: true},
  {id: 4, label: 'HTML'},
  {id: 5, label: 'CSS'},
  {id: 6, label: 'React Native', preselected: true},
  {id: 7, label: 'Vue'},
];
const tagsArrWithPartiallyDisabledValues = [
  {id: 1, label: 'JavaScript'},
  {id: 2, label: 'React', disabled: true},
  {id: 4, label: 'HTML'},
  {id: 5, label: 'CSS'},
  {id: 6, label: 'React Native', disabled: true},
  {id: 7, label: 'Vue'},
];
interface IProps {
  withCross?: boolean;
  size: 'large' | 'small';
  color?: string;
  textColor?: string;
  preselectedTemplate?: boolean;
  partiallyDisabledTemplate?: boolean;
  disabledColor?: string;
  selectedColor?: string;
}
export default class TagsPreview extends React.Component<IProps> {
  render() {
    const {preselectedTemplate, partiallyDisabledTemplate, ...tagsProps} =
      this.props;
    const tagsArr = preselectedTemplate
      ? tagsArrWithPreselectedValues
      : partiallyDisabledTemplate
      ? tagsArrWithPartiallyDisabledValues
      : tagsArrWithoutPreselectedValues;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text bold>Rectangle</Text>
          <Tags shape="rectangle" tags={tagsArr} {...tagsProps} />
        </View>
        <View style={styles.wrapper}>
          <Text bold>Rounded</Text>
          <Tags shape="rounded" tags={tagsArr} {...tagsProps} />
        </View>
        <View style={styles.wrapper}>
          <Text bold>Round</Text>
          <Tags shape="round" tags={tagsArr} {...tagsProps} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginTop: 20,
  },
});
