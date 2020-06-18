import * as React from 'react';
import { View } from 'react-native';

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
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'large' | 'small';
  withCross?: boolean; 
  shadow?: boolean;
  props?: any;
  style?: any;
}
export interface ITagsState {
  selectedTags: number[];
}
class Tags extends React.Component<ITagsProps, ITagsState> {
  static defaultProps: any;
  state = {
    selectedTags: [],
  };
  handleChange(tagId: number) {
    if (this.state.selectedTags.includes(tagId)) {
      const filteredArr = this.state.selectedTags.filter(tag => tag === tagId);
      this.setState({selectedTags: [...filteredArr]});
    } else {
      this.setState({selectedTags: [...this.state.selectedTags, tagId]});
    }
  }

  render() {
    const {
      style,
      theme,
      tags,
      ...props
    } = this.props;
    const styles: any = getStyles();
    return (
      <View style={styles.container}>
        {
          tags.map(tag => (
            <Tag key={tag.id} onChange={() => this.handleChange(tag.id)} {...props}>{tag.label}</Tag>
          ))
        }
      </View>
    );
  }
}
Tags.defaultProps = {
  tags: [],
  size: 'regular',
  shape: 'rounded',
  shadow: false
};
export default withTheme(Tags);
