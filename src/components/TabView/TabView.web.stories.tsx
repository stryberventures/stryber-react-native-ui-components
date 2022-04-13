import * as React from 'react';

import {tabView} from '../../static/markdown';
import WebUnsupportedPreview from '../../storybook/preview/WebUnsupportedPreview';

export default {
  title: 'TabView',
  component: WebUnsupportedPreview,
  parameters: {
    notes: {tabView},
  },
};

export const Default = () => (
  <WebUnsupportedPreview
    description="Reason: we are using 'react-native-gesture-handler' library which doesn't
      support web version"
    imageUrl="https://s3.eu-west-1.amazonaws.com/matterhorn-assets-website-stage/native_components_preview/tabview.gif"
  />
);
