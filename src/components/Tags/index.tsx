import * as React from 'react';
import {View, Text} from 'react-native';

import Tag from './Tag';
import getStyles from './styles';
import {FC, useState} from 'react';
import {useTheme} from '../Theme';

export interface ITagData {
  id: string | number;
  label: string;
  preselected?: boolean;
  disabled?: boolean;
}

export interface ITagsProps {
  tags: ITagData[];
  color?: string;
  textColor?: string;
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'large' | 'small';
  withCross?: boolean;
  shadow?: boolean;
  style?: any;
  error?: string;
  onChange?: (selectedTags: (string | number)[]) => any;
  disabledColor?: string;
  selectedColor?: string;
}
export interface ITagsState {
  selectedTags: (string | number)[];
  resetTags: boolean;
}

const createDefaultTags = (tags: ITagData[]): (string | number)[] =>
  tags.filter(tag => tag.preselected).map(tag => tag.id);

const Tags: FC<ITagsProps> = ({tags, onChange, error, ...rest}) => {
  const {theme} = useTheme();
  const [selectedTags, setSelectedTags] = useState(createDefaultTags(tags));
  const styles = getStyles(theme);

  const handleChange = (selectedIds: (string | number)[]) => {
    setSelectedTags(selectedIds);
    onChange!(selectedTags);
  };

  const handleTagChange = (tagId: string | number) => {
    if (selectedTags.includes(tagId)) {
      const filteredArr = selectedTags.filter(tag => tag !== tagId);
      handleChange([...filteredArr]);
    } else {
      handleChange([...selectedTags, tagId]);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {tags.map(tag => (
          <Tag
            preselected={!!tag.preselected}
            disabled={!!tag.disabled}
            key={tag.id}
            onTagChange={() => handleTagChange(tag.id)}
            {...rest}>
            {tag.label}
          </Tag>
        ))}
      </View>
      {!!error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </>
  );
};

Tags.defaultProps = {
  tags: [],
  size: 'small',
  shape: 'rounded',
  shadow: false,
  onChange: () => {},
};

export default Tags;
