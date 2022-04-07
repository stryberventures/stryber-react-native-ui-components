import * as React from 'react';

import {tabView} from '../../static/markdown';

const TaViewWebDescription = () => (
  <>
    <h1>This component is only available in native storybook</h1>
    <h2>
      Reason: we are using 'react-native-gesture-handler' library which doesn't
      support web version
    </h2>
    <h1>Preview gif:</h1>
    <img
      src="https://s3.eu-west-1.amazonaws.com/matterhorn-assets-website-stage/native_components_preview/tabview.gif"
      alt="TabView"
    />
  </>
);

export default {
  title: 'TaView',
  component: TaViewWebDescription,
  parameters: {
    notes: {tabView},
  },
};

export const Default = () => <TaViewWebDescription />;
