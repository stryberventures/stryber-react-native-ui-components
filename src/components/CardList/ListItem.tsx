import React from 'react';
import {View, Text} from 'react-native';

import Card from '../Card';
import Checkbox from '../Checkbox';
import {defaultTheme as theme} from '../other/constants';
import {IListItem, IProps} from './index';
import getStyles from './styles';

const ListItem: React.FC<IListItem & Partial<IProps>> = props => {
  const styles = getStyles(theme, props);

  return (
    <Card shadow style={styles.cardStyle}>
      {props.quiz && props.quizCounter && (
        <View style={styles.quizWrapper}>
          <Text style={styles.quizText}>{props.quizCounter}</Text>
        </View>
      )}
      {props.radiobuttonLeft && <Checkbox {...props.radiobuttonProps} radio />}
      {props.checkboxLeft && <Checkbox {...props.checkboxProps} />}
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{props.text}</Text>
        {props.secondaryText && (
          <Text style={styles.secondaryText}>{props.secondaryText}</Text>
        )}
      </View>
      {props.radiobuttonRight && <Checkbox {...props.radiobuttonProps} radio />}
      {props.checkboxRight && <Checkbox {...props.checkboxProps} />}
    </Card>
  );
};

export default ListItem;
