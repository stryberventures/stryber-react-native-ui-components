import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Block, {IBlockProps} from '../Block';
import withTheme from '../withTheme';
import getStyles from './styles';
interface ICardProps extends IBlockProps {
  card?: boolean;
  shadow?: boolean;
  gradientStyle?: any;
  gradientColors?: string[];
  resizeMode?: 'center' | 'cover' | 'contain' | 'stretch' | 'repeat';
  backgroundImage?: any;
  theme?: any;
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
        <LinearGradient style={gradientStyles} colors={gradientColors!}>
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
      <Block shadow={!!styles.shadow} style={cardStyles} {...props}>
        {backgroundImage ? this.renderBgImageCard() : children}
      </Block>
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
