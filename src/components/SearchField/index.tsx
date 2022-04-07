import React, {FC} from 'react';
import Input, {IInputProps} from '../Input';
import {Search} from '../Icons';
import {useTheme} from '../Theme';

export interface ISearchFieldProps extends IInputProps {
  iconColor?: string;
}

const SearchField: FC<ISearchFieldProps> = ({iconColor, ...rest}) => {
  const {theme} = useTheme();

  return (
    <Input
      {...rest}
      icon={() => <Search fill={iconColor || theme.colors.primary} />}
    />
  );
};

export default SearchField;
