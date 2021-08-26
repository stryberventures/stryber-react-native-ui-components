import React, {Component} from 'react';
import {View, Animated} from 'react-native';
import withTheme from '../withTheme';
import getStyles from './styles';
import {defaultTheme} from '../other/constants';

export interface ILoaderProps {
  size: 'small' | 'large';
  dotsAmount: number;
  theme?: any;
}
interface ILoaderState {
  dotAnimations: Animated.Value[];
}
class Loader extends Component<ILoaderProps> {
  static defaultProps: any;
  state: ILoaderState = {
    dotAnimations: [],
  };
  animateDot(value: Animated.Value, delay: number) {
    return Animated.sequence([
      Animated.timing(value, {
        toValue: 1,
        duration: 400,
        delay: delay,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: 300,
        delay: 100,
        useNativeDriver: false,
      }),
    ]);
  }
  initializeAnimation() {
    const dotAnimations = [];
    for (let i = 0; i < this.props.dotsAmount; i++) {
      dotAnimations.push(new Animated.Value(0));
    }
    this.setState({dotAnimations}, () => {
      const animations: Array<any> = this.state.dotAnimations.map(
        (value, index) => this.animateDot(value, index * 600),
      );
      Animated.parallel(animations).start(() => this.initializeAnimation());
    });
  }
  componentDidMount() {
    this.initializeAnimation();
  }

  render() {
    // @ts-ignore
    const {theme} = this.props;
    const interpolated = this.state.dotAnimations.map((dot: Animated.Value) => {
      return dot.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.gray, theme.colors.primary],
      });
    });
    const styles = getStyles(theme, this.props);
    return (
      <View style={styles.container}>
        {interpolated.map(value => (
          <Animated.View style={[styles.dot, {backgroundColor: value}]} />
        ))}
      </View>
    );
  }
}
Loader.defaultProps = {
  size: 'small',
  dotsAmount: 4,
  theme: defaultTheme,
};
export default withTheme(Loader);
