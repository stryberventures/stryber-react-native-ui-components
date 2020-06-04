import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Card from '../Card';
import Checkbox from '../Checkbox';
import {defaultTheme as theme} from '../other/constants';
import {IListItem, IProps} from './index';
import getStyles from './styles';

const ListItem: React.FC<IListItem & Partial<IProps>> = props => {
  const [isActive, setIsActive] = useState(false);

  const styles = getStyles(theme, props, isActive);

  const toggleQuiz = () => {
    if (props.onQuizPress) {
      props.onQuizPress();
    }
    setIsActive(state => !state);
  };

  return (
    <TouchableOpacity onPress={toggleQuiz} disabled={!props.quiz}>
      <Card shadow style={styles.cardStyle}>
        {props.quiz && props.quizCounter && (
          <View style={styles.leftElementWrapper}>
            <View style={styles.quizWrapper}>
              <Text style={styles.quizText}>{props.quizCounter}</Text>
            </View>
          </View>
        )}
        {props.radiobuttonLeft && (
          <View style={styles.leftElementWrapper}>
            <Checkbox {...props.radiobuttonProps} radio />
          </View>
        )}
        {props.checkboxLeft && (
          <View style={styles.leftElementWrapper}>
            <Checkbox {...props.checkboxProps} />
          </View>
        )}
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{props.text}</Text>
          {props.secondaryText && (
            <Text style={styles.secondaryText}>{props.secondaryText}</Text>
          )}
        </View>
        {props.radiobuttonRight && (
          <View style={styles.rightElementWrapper}>
            <Checkbox {...props.radiobuttonProps} radio />
          </View>
        )}
        {props.checkboxRight && (
          <View style={styles.rightElementWrapper}>
            <Checkbox {...props.checkboxProps} />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default ListItem;