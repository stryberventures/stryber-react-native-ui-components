import {defaultTheme} from '../../other/constants';

export const getClasses = ({theme = defaultTheme}) => ({
  label: {
    container: {
      marginBottom: theme.spaces.xxs,
    },
  },
});
