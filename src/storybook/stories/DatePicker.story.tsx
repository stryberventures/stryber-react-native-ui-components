import * as React from 'react';
import { Alert } from 'react-native';
import {DatePicker, Button} from '../../components';
// @ts-ignore
import CenterView from '../../components/CenterView';
import {storiesOf} from '@storybook/react-native';
import {datePicker} from '../../static/markdown';
import { ArrowDown } from '../../components/Icons';

storiesOf('DatePicker', module)
  .addParameters({
    notes: {markdown: datePicker},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <DatePicker label="Choose date" mode="date" />;
  })
  .add('datetime mode', () => {
    return <DatePicker label="Choose date" mode="datetime" iconSize={18} />;
  })
  .add('time mode', () => {
    return <DatePicker mode="time" icon={() => <ArrowDown  fill={'#444'} />} style={{width: 135}}/>;
  })
  .add('modalMode', () => {
    const TestComponent = () => {
      const datePickerRef = React.useRef();
      const onPress = () => {
        if (datePickerRef.current && datePickerRef.current.showModal) {
          datePickerRef.current.showModal();
        }
      };
      const onChange = (data) => {
        setTimeout(() => {
          Alert.alert('', `${data.name}: ${data.value}`);
        }, 0);
      };
      return (
        <>
          <DatePicker ref={datePickerRef} modalMode onChange={onChange} />
          <Button onPress={onPress}>Open date picker</Button>
        </>
      );
    };

    return <TestComponent />;
  });
