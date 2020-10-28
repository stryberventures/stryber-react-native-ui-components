import * as React from 'react';
import {View, Text} from 'react-native';

import Tag from './Tag';
import withTheme from '../withTheme';
import getStyles from './styles';

export interface ITagData {
  id: string | number;
  label: string;
  preselected?: boolean;
  disabled?: boolean;
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
  onChange?: (selectedTags: (string | number)[]) => any;
  onRef?: (arg: any) => void;
  disabledColor?: string;
  selectedColor?: string;
}
export interface ITagsState {
  selectedTags: (string | number)[];
  resetTags: boolean;
}

const createDefaultTags = (tags: ITagData[]): (string | number)[] =>
  tags.filter(tag => tag.preselected).map(tag => tag.id);

class Tags extends React.Component<ITagsProps, ITagsState> {
  static defaultProps: any;
  state = {
    selectedTags: createDefaultTags(this.props.tags),
    resetTags: false,
  };

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentDidUpdate(prevProps: ITagsProps) {
    if (prevProps.tags.length < this.props.tags.length) {
      const newTags = this.props.tags
        .filter(
          tag =>
            !prevProps.tags.find(oldTag => oldTag.id === tag.id) &&
            tag.preselected,
        )
        .map(tag => tag.id);
      this.setState(state => ({
        selectedTags: [...state.selectedTags, ...newTags],
      }));
    } else if (prevProps.tags.length > this.props.tags.length) {
      const newTags = this.state.selectedTags.filter(tagId =>
        this.props.tags.some(tag => tag.id === tagId),
      );
      this.setState({
        selectedTags: newTags,
      });
    }
  }

  // this method will be used by parent component through ref
  resetTags = () => {
    this.setState(
      {
        selectedTags: [],
        resetTags: true,
      },
      () => {
        this.setState({
          resetTags: false,
        });
      },
    );
  };

  handleTagChange(tagId: string | number) {
    if (this.state.selectedTags.includes(tagId)) {
      const filteredArr = this.state.selectedTags.filter(tag => tag !== tagId);
      this.handleChange([...filteredArr]);
    } else {
      this.handleChange([...this.state.selectedTags, tagId]);
    }
  }

  handleChange(selectedIds: (string | number)[]) {
    this.setState({selectedTags: selectedIds}, () => {
      this.props.onChange!(this.state.selectedTags);
    });
  }

  render() {
    const {style, theme, tags, ...props} = this.props;
    const styles: any = getStyles(theme);
    return (
      <>
        <View style={styles.container}>
          {tags.map(tag => (
            <Tag
              resetTag={this.state.resetTags}
              preselected={!!tag.preselected}
              disabled={!!tag.disabled}
              key={tag.id}
              onTagChange={() => this.handleTagChange(tag.id)}
              {...props}>
              {tag.label}
            </Tag>
          ))}
        </View>
        {!!this.props.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.props.error}</Text>
          </View>
        )}
      </>
    );
  }
}
Tags.defaultProps = {
  tags: [],
  size: 'regular',
  shape: 'rounded',
  shadow: false,
  onChange: () => {},
  onRef: () => {},
};
export default withTheme(Tags);
