import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Text, Tags} from '../../../components';

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
  resetFunctionality?: boolean;
}
export default class TagsPreview extends React.Component<IProps> {
  render() {
    const {
      preselectedTemplate,
      partiallyDisabledTemplate,
      resetFunctionality,
      ...tagsProps
    } = this.props;
    const onRef = resetFunctionality ? ref => (this.child = ref) : undefined;
    const tagsArr = preselectedTemplate
      ? tagsArrWithPreselectedValues
      : partiallyDisabledTemplate
      ? tagsArrWithPartiallyDisabledValues
      : tagsArrWithoutPreselectedValues;
    return (
      <View style={styles.container}>
        {resetFunctionality ? (
          <View style={styles.wrapper}>
            <Button title="reset tags" onPress={() => this.child.resetTags()} />
            <Tags
              shape="rectangle"
              tags={tagsArr}
              onRef={onRef}
              {...tagsProps}
            />
          </View>
        ) : (
          <>
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
          </>
        )}
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
