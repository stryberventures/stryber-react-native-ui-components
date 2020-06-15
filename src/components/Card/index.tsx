import React, {Component} from 'react';
import {ImageBackground, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Block, {IBlockProps} from '../Block';
import withTheme from '../withTheme';
import getStyles from './styles';
export interface ICardProps extends IBlockProps {
  card?: boolean;
  shadow?: boolean;
  shadowTwo?: boolean;
  gradientStyle?: any;
  gradientColors?: string[];
  resizeMode?: 'center' | 'cover' | 'contain' | 'stretch' | 'repeat';
  backgroundImage?: any;
  theme?: any;
  style?: any;
  props?: any;
  containerStyles?: any;
  background?: string;
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
      shadowTwo,
      style,
      containerStyles,
      ...rest
    } = this.props;
    const styles = getStyles(theme, this.props);
    return Platform.OS === 'ios' ? (
      <Block
        flex={0}
        style={{borderRadius: theme.sizes.blockRadius, ...containerStyles}}
        shadow={shadow}
        shadowTwo={shadowTwo}>
        <Block style={styles.cardStyles} {...rest}>
          {backgroundImage ? this.renderBgImageCard() : children}
        </Block>
      </Block>
    ) : (
      <Block
        shadow={shadow}
        shadowTwo={shadowTwo}
        style={styles.cardStyles}
        {...rest}>
        {backgroundImage ? this.renderBgImageCard() : children}
      </Block>
    );
  }
}
Card.defaultProps = {
  card: true,
  shadow: false,
  shadowTwo: false,
  gradientColors: ['transparent', '#000'],
  resizeMode: 'cover',
  gradientStyle: {},
  style: {},
};
export default withTheme(Card);
