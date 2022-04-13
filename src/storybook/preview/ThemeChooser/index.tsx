import * as React from 'react';
import {ThemeProvider, useTheme} from '../../../components/Theme';
import Input from '../../../components/Input';
import Switch from '../../../components/Switch';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../../components/Text';

const initTheme = {colors: {primary: '#ea3590'}};

const themeVariants = [
  {colors: {primary: '#ea3590'}},
  {colors: {primary: '#757575'}},
  {colors: {primary: '#4624bf'}},
  {colors: {primary: '#a64825'}},
  {colors: {primary: '#33acbb'}},
];

const ThemePreview = () => {
  const {theme, updateTheme} = useTheme();

  const renderThemeVariants = () =>
    themeVariants.map(themeVariant => (
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: themeVariant.colors.primary,
          borderRadius: 5,
        }}
        onPress={() => updateTheme(themeVariant)}
      />
    ));

  return (
    <View
      style={{
        justifyContent: 'space-around',
        height: '100%',
        paddingHorizontal: 20,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {renderThemeVariants()}
      </View>
      <Input placeholder="Input" variant="lined" />
      <Switch text="Switch" value={true} />
      <Checkbox text="Checkbox" value={true} />
      <Button>Button</Button>
      <View style={{flexDirection: 'row'}}>
        <Text>Current theme primary color:</Text>
        <View
          style={{
            backgroundColor: theme.colors.primary,
            width: 20,
            height: 20,
            borderRadius: 5,
            marginLeft: 10,
          }}
        />
      </View>
    </View>
  );
};

const ThemeChooser = () => (
  <ThemeProvider initial={initTheme}>
    <ThemePreview />
  </ThemeProvider>
);

export default ThemeChooser;
