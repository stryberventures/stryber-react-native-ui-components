import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import {Block} from '../index';
import withTheme from '../withTheme';
import getStyles from './styles';

class Card extends Component {
  renderBgImageCard = () => {
    const {
      theme,
      backgroundImage,
      gradientColors = ['transparent', '#000'],
      children,
      gradientStyle,
      resizeMode = 'cover',
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
};

Card.propTypes = {
  card: PropTypes.bool,
};

export default withTheme(Card);
