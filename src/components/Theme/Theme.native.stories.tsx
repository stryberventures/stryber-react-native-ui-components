import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import ThemeChooser from '../../storybook/preview/ThemeChooser';

storiesOf('Theme', module).add('default', () => <ThemeChooser />);
