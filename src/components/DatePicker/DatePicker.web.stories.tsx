import * as React from 'react';
import '../../storybook/preview/WebUnsupportedPreview/styles.css';

import {datePicker} from '../../static/markdown';
import WebUnsupportedPreview from '../../storybook/preview/WebUnsupportedPreview';

export default {
  title: 'DatePicker',
  component: WebUnsupportedPreview,
  parameters: {
    notes: {datePicker},
  },
};

export const Default = () => (
  <WebUnsupportedPreview
    description="Reason: we are using 'react-native-date-picker' library which doesn't
        support web version"
    imageUrl="https://s3.eu-west-1.amazonaws.com/matterhorn-assets-website-stage/native_components_preview/datepicker.gif"
  />
);
