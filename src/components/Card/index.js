import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import {Text, Block, Button} from '../index';
import withTheme from '../withTheme';

class Card extends Component {
  render() {
    const {theme, ...props} = this.props;

    const cardStyles = [];
    return (
      <View
        style={{
          borderRadius: theme.sizes.radius,
          overflow: 'hidden',
        }}>
        <ImageBackground
          resizeMode="cover"
          style={{height: 350}}
          source={require('../../static/images/mountain.jpeg')}>
          <LinearGradient style={{flex: 1}} colors={['transparent', '#000']}>
            <Block
              padding={theme.sizes.cardPadding}
              style={{justifyContent: 'flex-end'}}>
              <Text white bold size={theme.sizes.h2}>
                Card Example
              </Text>
              <Text
                style={{marginVertical: 7}}
                white
                bold
                size={theme.sizes.title}>
                € 50/Month
              </Text>
              <Text white style={{marginBottom: 10}} size={theme.sizes.caption}>
                Subscriptions will automatically renew and your credit card will
                be charged at the end
              </Text>
              <Button border="white" color="transparent">
                <Text size={theme.sizes.title} white header center bold>
                  Button text
                </Text>
              </Button>
            </Block>
          </LinearGradient>
        </ImageBackground>
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
