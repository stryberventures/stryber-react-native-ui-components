import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  Block,
  Text,
  Header,
  Button,
  Checkbox,
  Switch,
  Input,
  withTheme
} from "../../../components";
import { UserIcon } from "../../../components/Icons";
import Icon from "react-native-vector-icons/Ionicons";
interface IThemeChooserProps extends React.HTMLAttributes<Element> {
  themes: any[];
  setTheme: (...args: any[]) => any;
}
class ThemeChooser extends Component<IThemeChooserProps, {}> {
  renderThemesPreview = () => {
    const { setTheme, themes } = this.props;
    return themes.map(theme => (
      <TouchableOpacity
        key={theme.key}
        style={{ alignItems: "center", marginHorizontal: 5 }}
        flex={0}
        onPress={() => setTheme(theme.key)}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.sizes.radius
          }}
        />
        <Text style={{ marginTop: 5 }}>{theme.key}</Text>
      </TouchableOpacity>
    ));
  };
  render() {
    return (
      <SafeAreaView>
        <Block flex={0}>
          <Text center>Choose Theme:</Text>
          <Block
            flex={0}
            row
            style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
          >
            {this.renderThemesPreview()}
          </Block>
        </Block>
        <Block
          flex={0}
          style={{
            height: "100%",
            marginTop: 40,
            justifyContent: "flex-start",
            paddingHorizontal: 20
          }}
        >
          <Block
            flex={0}
            style={{
              width: "100%",
              height: "60%",
              justifyContent: "space-around"
            }}
          >
            <Header
              text="Header"
              leftIcon={() => (
                <Icon
                  style={{
                    height: 24,
                    width: 44,
                    position: "absolute",
                    left: 10,
                    fontSize: 24
                  }}
                  color="#fff"
                  name="ios-arrow-back"
                  onPress={() => {}}
                />
              )}
              rightIcon={() => (
                <Icon
                  style={{
                    height: 24,
                    width: 44,
                    position: "absolute",
                    right: 10,
                    fontSize: 24,
                    textAlign: "right"
                  }}
                  color="#fff"
                  name="ios-search"
                  onPress={() => {}}
                />
              )}
            />
            <Button color="primary">
              <Text header white center bold>
                Button
              </Text>
            </Button>
            <Input
              email
              withLeftBorder={false}
              placeholder="Input"
              icon={() => <UserIcon />}
            />
            <Checkbox text="Checkbox" value={true} />
            <Checkbox text="Radio" radio value={true} />
            <Switch text="Switch" value={true} />
          </Block>
        </Block>
      </SafeAreaView>
    );
  }
}
export default withTheme(ThemeChooser);
