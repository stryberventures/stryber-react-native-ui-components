import React, {FC} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Block, {IBlockProps} from '../Block/index';
import getStyles from './styles';
import {ThemeType, useTheme} from '../Theme';

export interface ICardProps extends IBlockProps {
  card?: boolean;
  shadow?: boolean;
  shadowType?: 'normal' | 'large';
  bgImageStyles?: any;
  resizeMode?: 'center' | 'cover' | 'contain' | 'stretch' | 'repeat';
  backgroundImage?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  background?: keyof ThemeType['colors'] | string;
}

const Card: FC<ICardProps> = ({
  backgroundImage,
  background,
  children,
  shadow,
  shadowType,
  style,
  containerStyles,
  bgImageStyles,
  resizeMode,
  ...rest
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme, background, shadow);

  const renderBgImageCard = () => {
    return (
      <ImageBackground
        resizeMode={resizeMode}
        imageStyle={[styles.imageBgStyles, bgImageStyles]}
        style={{minHeight: theme.sizes.cardWithImgBgMinHeight}}
        source={backgroundImage!}>
        {children}
      </ImageBackground>
    );
  };

  if (Platform.OS === 'ios') {
    return (
      <Block
        flex={0}
        style={[{borderRadius: theme.sizes.blockRadius}, containerStyles]}
        shadow={shadow}
        shadowType={shadowType}>
        <Block style={[styles.cardStyles, style]} {...rest}>
          {backgroundImage ? renderBgImageCard() : children}
        </Block>
      </Block>
    );
  }

  return (
    <Block
      shadow={shadow}
      shadowType={shadowType}
      style={styles.cardStyles}
      {...rest}>
      {backgroundImage ? renderBgImageCard() : children}
    </Block>
  );
};

Card.defaultProps = {
  card: true,
  shadow: false,
  shadowType: 'normal',
  resizeMode: 'cover',
  style: {},
};

export default Card;
