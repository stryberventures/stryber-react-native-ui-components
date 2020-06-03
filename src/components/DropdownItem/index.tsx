import React, {PureComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import withTheme from '../withTheme';
import Ripple from '../Ripple';
import getStyles from './styles';
interface IDropdownItemProps extends React.HTMLAttributes<Element> {
  index: number;
  style?: any;
  theme?: any;
  props?: any;
  onPress?: any;

  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleInsets?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  underlayColor?: string;
}
interface IDropdownItemState {
  isTouched: boolean;
}
class DropdownItem extends PureComponent<
  IDropdownItemProps,
  IDropdownItemState
> {
  static defaultProps: any;
  state = {
    isTouched: false,
  };
  ripple = React.createRef();
  constructor(props: IDropdownItemProps) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress(event: any, index: number) {
    const {rippleInsets, onPress} = this.props;
    if (event != null) {
      /* Adjust event location */
      const eventLocation = {
        locationY: event.nativeEvent.locationY - rippleInsets!.top!,
        locationX: event.nativeEvent.locationX - rippleInsets!.left!,
      };
      /* Start ripple directly from event */
      // @ts-ignore
      this.ripple.current.startRipple(eventLocation);
    }
    onPress!(index);
  }
  onPressIn = () => {
    this.setState({
      isTouched: true,
    });
  };
  onPressOut = () => {
    this.setState({
      isTouched: false,
    });
  };
  renderRipple() {
    const {
      rippleColor,
      rippleOpacity,
      rippleDuration,
      rippleCentered,
      rippleSequential,
      rippleInsets,
      theme,
    } = this.props;
    const rippleStyles = {
      ...rippleInsets,
      top: 0,
      height: theme.sizes.buttonHeight,
      position: 'absolute',
    };
    return (
      <Ripple
        style={rippleStyles}
        rippleColor={rippleColor}
        rippleDuration={rippleDuration}
        rippleOpacity={rippleOpacity}
        rippleCentered={rippleCentered}
        rippleSequential={rippleSequential}
        rippleContainerBorderRadius={theme.sizes.radius}
        // @ts-ignore
        ref={this.ripple}
      />
    );
  }
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {children, style, theme, index, underlayColor, ...props} = this.props;
    const styles = getStyles(theme);
    return (
      // @ts-ignore
      <TouchableOpacity
        {...props}
        activeOpacity={1}
        onPress={(event: any) => this.onPress(event, index)}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        style={styles.container}>
        <View
          pointerEvents="box-only"
          style={[
            styles.content,
            style,
            this.state.isTouched
              ? {
                  backgroundColor: theme.colors.gray5,
                }
              : {},
          ]}>
          {children}
          {this.renderRipple()}
        </View>
      </TouchableOpacity>
    );
  }
}
DropdownItem.defaultProps = {
  rippleContainerBorderRadius: 0,
  shadeBorderRadius: 0,
  rippleColor: 'rgba(0, 0, 0, .38)',
  rippleCentered: false,
  rippleSequential: true,
  rippleInsets: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  rippleOpacity: 0.54,
  rippleDuration: 400,
};
export default withTheme(DropdownItem);
