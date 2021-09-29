import React, {Component} from 'react';
import {ImageBackground, Platform} from 'react-native';
import Block, {IBlockProps} from '../Block/index';
import withTheme from '../withTheme';
import getStyles from './styles';

export interface ICardProps extends IBlockProps {
  card?: boolean;
  shadow?: boolean;
  shadowType?: 'normal' | 'large';
  bgImageStyles?: any;
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
    const {theme, backgroundImage, bgImageStyles, children, resizeMode} =
      this.props;
    const styles = getStyles(theme, this.props);
    return (
      <ImageBackground
        resizeMode={resizeMode}
        imageStyle={[styles.imageBgStyles, bgImageStyles]}
        style={{minHeight: theme.sizes.cardWithImgBgMinHeight}}
        source={backgroundImage}>
        {children}
      </ImageBackground>
    );
  };
  render() {
    const {
      theme,
      backgroundImage,
      children,
      shadow,
      shadowType,
      // eslint-disable-next-line
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
        shadowType={shadowType}>
        <Block style={styles.cardStyles} {...rest}>
          {backgroundImage ? this.renderBgImageCard() : children}
        </Block>
      </Block>
    ) : (
      <Block
        shadow={shadow}
        shadowType={shadowType}
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
  shadowType: 'normal',
  resizeMode: 'cover',
  style: {},
};
export default withTheme(Card);
