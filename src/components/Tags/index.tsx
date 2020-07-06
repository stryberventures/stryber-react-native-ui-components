import * as React from 'react';
import { View, Text } from 'react-native';

import Tag from './Tag';
import withTheme from '../withTheme';
import getStyles from './styles';

export interface ITagData {
  id: number;
  label: string;
}

export interface ITagsProps {
  tags: ITagData[];
  theme?: any;
  color?: string;
  textColor?: string; 
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'large' | 'small';
  withCross?: boolean; 
  shadow?: boolean;
  style?: any;
  error?: string;
  onChange: (selectedTags: number[]) => any;
}
export interface ITagsState {
  selectedTags: number[];
}
class Tags extends React.Component<ITagsProps, ITagsState> {
  static defaultProps: any;
  state = {
    selectedTags: [],
  };
  handleTagChange(tagId: number) {
    if (this.state.selectedTags.includes(tagId)) {
      const filteredArr = this.state.selectedTags.filter(tag => tag !== tagId);
      this.handleChange([...filteredArr]);
    } else {
      this.handleChange([...this.state.selectedTags, tagId]);
    }
  }
  handleChange(selectedIds: number[]) {
    this.setState({selectedTags: selectedIds}, () => {
      this.props.onChange(this.state.selectedTags);
    });
  }
  render() {
    const {
      style,
      theme,
      tags,
      ...props
    } = this.props;
    const styles: any = getStyles(theme);
    return (
      <View style={styles.container}>
        {
          tags.map(tag => (
            <Tag key={tag.id} onTagChange={() => this.handleTagChange(tag.id)} {...props}>{tag.label}</Tag>
          ))
        }
        {!!this.props.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.props.error}</Text>
          </View>
        )}
      </View>
    );
  }
}
Tags.defaultProps = {
  tags: [],
  size: 'regular',
  shape: 'rounded',
  shadow: false,
  onChange: () => {}
};
export default withTheme(Tags);