import * as React from 'react';

import {datePicker} from '../../static/markdown';

const DatePickerWebDescription = () => (
  <>
    <h1>This component is only available in native storybook</h1>
    <h2>
      Reason: we are using 'react-native-date-picker' library which doesn't
      support web version
    </h2>
    <h1>Preview gif:</h1>
    <img
      src="https://s3.eu-west-1.amazonaws.com/matterhorn-assets-website-stage/native_components_preview/datepicker.gif"
      alt="DatePicker"
    />
  </>
);

export default {
  title: 'DatePicker',
  component: DatePickerWebDescription,
  parameters: {
    notes: {datePicker},
  },
};

export const Default = () => <DatePickerWebDescription />;
