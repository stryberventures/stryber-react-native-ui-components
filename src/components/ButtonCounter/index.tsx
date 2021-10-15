import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import withTheme from '../withTheme';
import Icons from '../Icons';
import Text from '../Text';
import getStyles from './styles';

export interface IButtonCounterProps extends TouchableOpacityProps {
  style?: any;
  theme?: any;
  initialValue?: number;
  value?: number;
  minValue?: number;
  maxValue?: number;
  children: React.ReactNode;
  shape?: 'rectangle' | 'rounded' | 'round';
  size?: 'regular' | 'small' | 'mini';
  disabled?: boolean;
  shadow?: boolean;
  color?: string;
  renderContent?: (children: any, style: any) => React.ReactNode;
  countTextTemplate?: string;
  secondaryColor?: string;
  renderMinusIcon?: () => React.ReactNode;
  renderPlusIcon?: () => React.ReactNode;
  iconProps?: any;
  renderCount?: (i: number, style: any) => React.ReactNode;
  onCountChange: (count: number, i: number) => void;
}
export interface IButtonCounterState {
  count: number;
  isTouched: boolean;
  prevPropValue?: number;
}

class ButtonCounter extends React.Component<
  IButtonCounterProps,
  IButtonCounterState
> {
  static defaultProps: any;
  static getDerivedStateFromProps(
    props: IButtonCounterProps,
    state: IButtonCounterState,
  ) {
    return {
      ...state,
      count: state.prevPropValue !== props.value ? props.value : state.count,
      prevPropValue: props.value,
    };
  }
  constructor(props: IButtonCounterProps) {
    super(props);

    this.state = {
      // @ts-ignore-next-line
      count: props.initialValue,
      prevPropValue: props.value,
      isTouched: false,
    };
  }

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
        this.props.onCountChange(this.state.count, increment);
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
      renderMinusIcon,
      renderPlusIcon,
      minValue,
      maxValue,
      // eslint-disable-next-line
      value,
      ...etc
    } = this.props;
    const styles = getStyles(theme, this.props, this.state);
    const minusButtonDisabled = this.state.count === minValue;
    const plusButtonDisabled = !!maxValue && this.state.count === maxValue;

    if (this.state.count > 0) {
      return (
        <View style={[styles.container, style]}>
          <View style={styles.leftCol}>
            <TouchableOpacity
              disabled={minusButtonDisabled}
              onPress={() => this.onButtonPress(-1)}
              style={styles.reduceButton}>
              {(renderMinusIcon && renderMinusIcon()) || (
                <Icons.Minus
                  {...iconProps}
                  fill={styles.buttonIconMinus.color}
                  style={styles.buttonIcon}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.centerCol}>
            {renderCount(this.state.count, styles.buttonText)}
          </View>
          <View style={styles.rightCol}>
            <TouchableOpacity
              disabled={plusButtonDisabled}
              onPress={() => this.onButtonPress(1)}
              style={styles.growButton}>
              {(renderPlusIcon && renderPlusIcon()) || (
                <Icons.Plus
                  {...iconProps}
                  fill={styles.buttonIconPlus.color}
                  style={styles.buttonIcon}
                />
              )}
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
  initialValue: 0,
  minValue: 0,
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
