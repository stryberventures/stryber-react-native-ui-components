import React, {Component} from 'react';
import {ImageBackground, View, ViewPropTypes} from 'react-native';
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

Card.propTypes = {
  card: PropTypes.bool,
  shadow: PropTypes.bool,
  gradientStyle: ViewPropTypes.style,
  gradientColors: PropTypes.array,
  resizeMode: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  backgroundImage: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  theme: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: ViewPropTypes.style,
};

export default withTheme(Card);
