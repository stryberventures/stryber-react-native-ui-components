import React, {Component} from 'react';
import {ImageBackground, View, ViewPropTypes} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Block from '../Block';
import withTheme from '../withTheme';
import getStyles from './styles';
interface ICardProps extends React.HTMLAttributes<Element> {
  card?: boolean;
  shadow?: boolean;
  gradientStyle?: any;
  gradientColors?: any[];
  resizeMode?: string;
  backgroundImage?: {} | number;
  theme: {};
  style?: any;
  props?: any;
}
class Card extends Component<ICardProps, {}> {
  static defaultProps: any;
  renderBgImageCard = () => {
    const {
      theme,
      backgroundImage,
      gradientColors,
      children,
      gradientStyle,
      resizeMode,
    } = this.props;
    const gradientStyles = [{flex: 1}, gradientStyle];
    return (
      <ImageBackground
        resizeMode={resizeMode}
        style={{minHeight: theme.sizes.cardWithImgBgMinHeight}}
        source={backgroundImage}>
        <LinearGradient style={gradientStyles} colors={gradientColors}>
          {children}
        </LinearGradient>
      </ImageBackground>
    );
  };
  render() {
    const {
      theme,
      backgroundImage,
      children,
      shadow,
      style,
      ...props
    } = this.props;
    const styles = getStyles(theme);
    const cardStyles = [
      {
        borderRadius: theme.sizes.radius,
        overflow: 'hidden',
        flex: 0,
      },
      shadow && {backgroundColor: '#fff'},
      style,
    ];
    return (
      <View style={shadow && styles.shadow}>
        <Block style={cardStyles} {...props}>
          {backgroundImage ? this.renderBgImageCard() : children}
        </Block>
      </View>
    );
  }
}
Card.defaultProps = {
  card: true,
  shadow: false,
  gradientColors: ['transparent', '#000'],
  resizeMode: 'cover',
  gradientStyle: {},
  style: {},
};
export default withTheme(Card);
