import * as React from 'react';
import {Alert} from 'react-native';
import DatePicker, {DatePickerType} from './index';
import CenterView from '../../storybook/CenterView';
import {storiesOf} from '@storybook/react-native';
import {datePicker} from '../../static/markdown';
import {ArrowDown} from '../../components/Icons';
import {useState} from 'react';
import Button from '../Button';

const Template = ({modalMode, ...rest}: Partial<DatePickerType>) => {
  const [showDateModal, setShowDateModal] = useState(false);

  const onDateSelected = (name: string, date: Date) => {
    Alert.alert('', `${name}: ${date}`);
  };

  if (modalMode) {
    return (
      <>
        {/* @ts-ignore */}
        <DatePicker
          {...rest}
          modalMode={true}
          onClose={() => setShowDateModal(false)}
          onDateSelected={onDateSelected}
          showDateModal={showDateModal}
        />
        <Button onPress={() => setShowDateModal(true)}>Open date picker</Button>
      </>
    );
  }
  return (
    <DatePicker
      {...rest}
      onDateSelected={onDateSelected}
      showDateModal={showDateModal}
    />
  );
};

storiesOf('DatePicker', module)
  .addParameters({
    notes: {markdown: datePicker},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <Template label="Choose date" mode="date" />;
  })
  .add('datetime mode', () => {
    return <Template label="Choose date" mode="datetime" iconSize={18} />;
  })
  .add('time mode', () => {
    return (
      <Template
        mode="time"
        icon={() => <ArrowDown fill={'#444'} />}
        style={{width: 135}}
      />
    );
  })
  .add('modalMode', () => (
    <Template
      modalMode
      modalButtonSelectText="Select"
      modalButtonCloseText="Close"
    />
  ));
