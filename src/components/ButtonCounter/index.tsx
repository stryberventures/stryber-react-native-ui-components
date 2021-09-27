import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import withTheme from '../withTheme';
import Icons from '../Icons';
import Text from '../Text';
import getStyles from './styles';

export interface IButtonCounterProps extends TouchableOpacityProps {
  style?: any;
  theme?: any;
  children: React.ReactNode;
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'regular' | 'small' | 'mini';
  disabled?: boolean;
  shadow?: boolean;
  color?: string;
  renderContent?: (children: any, style: any) => React.ReactNode;
  countTextTemplate?: string;
  secondaryColor?: string;
  iconProps?: any;
  renderCount?: (i: number, style: any) => React.ReactNode;
  onCountChange: (i: number) => void;
}
export interface IButtonCounterState {
  count: number;
  isTouched: boolean;
}

class ButtonCounter extends React.Component<
  IButtonCounterProps,
  IButtonCounterState
> {
  static defaultProps: any;
  state = {
    count: 1,
    isTouched: false,
  };

  handlePressIn = () => {
    this.setState({
      isTouched: true,
    });
  };
  handlePressOut = () => {
    this.setState({
      isTouched: false,
    });
  };

  renderCount = (count: number, style: any) => (
    <Text style={style}>{count}</Text>
  );

  renderContent = (children: React.ReactNode, textStyle: any) => (
    <Text style={textStyle}>{children}</Text>
  );

  onButtonPress = (increment: number) => {
    this.setState(
      {
        count: this.state.count + increment,
      },
      () => {
        this.props.onCountChange(this.state.count);
      },
    );
  };

  render() {
    const {
      style,
      theme,
      children,
      iconProps,
      renderCount = this.renderCount,
      renderContent = this.renderContent,
      ...etc
    } = this.props;
    const styles = getStyles(theme, this.props, this.state);

    if (this.state.count > 0) {
      return (
        <View style={styles.container}>
          <View style={styles.leftCol}>
            <TouchableOpacity
              onPress={() => this.onButtonPress(-1)}
              style={styles.reduceButton}>
              <Icons.Minus {...iconProps} />
            </TouchableOpacity>
          </View>
          <View style={styles.centerCol}>
            {renderCount(this.state.count, styles.buttonText)}
          </View>
          <View style={styles.rightCol}>
            <TouchableOpacity
              onPress={() => this.onButtonPress(1)}
              style={styles.growButton}>
              <Icons.Plus {...iconProps} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        {...etc}
        activeOpacity={1}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={() => this.onButtonPress(1)}
        style={[styles.button, style]}>
        {renderContent(children, styles.buttonText)}
        <View style={styles.touchOverlay} />
      </TouchableOpacity>
    );
  }
}
ButtonCounter.defaultProps = {
  iconProps: {
    fill: '#fff',
  },
  size: 'regular',
  shape: 'rounded',
  disabled: false,
  shadow: false,
  onPress: () => {},
};
export default withTheme(ButtonCounter);
