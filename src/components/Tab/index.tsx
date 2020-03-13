import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import TouchableItem from './TouchableItem';
import Animated from 'react-native-reanimated';
import withTheme from '../withTheme';
import {memoize} from '../other/utils';
import styles from './styles';
interface ITabProps extends React.HTMLAttributes<Element> {
  route: {};
  position: {};
  navigationState: {};
  renderLabel?: (...args: any[]) => any;
  renderIcon?: (...args: any[]) => any;
  renderBadge?: (...args: any[]) => any;
  getLabelText?: (...args: any[]) => any;
  getTestID?: (...args: any[]) => any;
  getAccessibilityLabel?: (...args: any[]) => any;
  getAccessible?: (...args: any[]) => any;
  theme: {};
  activeColor?: string;
  inactiveColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  labelStyle?: {};
  style?: {};
  onLayout?: (...args: any[]) => any;
  onPress?: (...args: any[]) => any;
  onLongPress?: (...args: any[]) => any;
}
class Tab extends React.Component<ITabProps, {}> {
  static defaultProps: any;
  getActiveOpacity = memoize((position, routes, tabIndex) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_, i) => i);
      return Animated.interpolate(position, {
        inputRange,
        outputRange: inputRange.map(i => (i === tabIndex ? 1 : 0)),
      });
    } else {
      return 1;
    }
  });
  getInactiveOpacity = memoize((position, routes, tabIndex) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_, i) => i);
      return Animated.interpolate(position, {
        inputRange,
        outputRange: inputRange.map(i => (i === tabIndex ? 0 : 1)),
      });
    } else {
      return 0;
    }
  });
  render() {
    const {
      route,
      position,
      navigationState,
      renderLabel: renderLabelPassed,
      renderIcon,
      renderBadge,
      getLabelText,
      getTestID,
      getAccessibilityLabel,
      getAccessible,
      theme,
      activeColor = theme.colors.primary,
      inactiveColor = theme.colors.gray2,
      pressColor = theme.colors.gray,
      pressOpacity,
      labelStyle,
      style,
      onLayout,
      onPress,
      onLongPress,
    } = this.props;
    const tabIndex = navigationState.routes.indexOf(route);
    const isFocused = navigationState.index === tabIndex;
    const activeOpacity = this.getActiveOpacity(
      position,
      navigationState.routes,
      tabIndex,
    );
    const inactiveOpacity = this.getInactiveOpacity(
      position,
      navigationState.routes,
      tabIndex,
    );
    let icon = null;
    let label = null;
    if (renderIcon) {
      const activeIcon = renderIcon({
        route,
        focused: true,
        color: activeColor,
      });
      const inactiveIcon = renderIcon({
        route,
        focused: false,
        color: inactiveColor,
      });
      if (inactiveIcon != null && activeIcon != null) {
        icon = (
          <View style={styles.icon}>
            <Animated.View style={{opacity: inactiveOpacity}}>
              {inactiveIcon}
            </Animated.View>
            <Animated.View
              style={[StyleSheet.absoluteFill, {opacity: activeOpacity}]}>
              {activeIcon}
            </Animated.View>
          </View>
        );
      }
    }
    const renderLabel =
      renderLabelPassed !== undefined
        ? renderLabelPassed
        : // eslint-disable-next-line no-shadow
          ({route, color}) => {
            const labelText = getLabelText({route});
            if (typeof labelText === 'string') {
              return (
                <Animated.Text
                  style={[
                    styles.label,
                    icon ? {marginTop: 0} : null,
                    {color},
                    labelStyle,
                    {fontFamily: theme.fonts.fontFamily},
                  ]}>
                  {labelText}
                </Animated.Text>
              );
            }
            return labelText;
          };
    if (renderLabel) {
      const activeLabel = renderLabel({
        route,
        focused: true,
        color: activeColor,
      });
      const inactiveLabel = renderLabel({
        route,
        focused: false,
        color: inactiveColor,
      });
      label = (
        <View>
          <Animated.View style={{opacity: inactiveOpacity}}>
            {inactiveLabel}
          </Animated.View>
          <Animated.View
            style={[StyleSheet.absoluteFill, {opacity: activeOpacity}]}>
            {activeLabel}
          </Animated.View>
        </View>
      );
    }
    const tabStyle = StyleSheet.flatten(style);
    const isWidthSet = tabStyle && tabStyle.width !== undefined;
    const tabContainerStyle = isWidthSet ? null : {flex: 1};
    const scene = {route};
    let accessibilityLabel = getAccessibilityLabel(scene);
    accessibilityLabel =
      typeof accessibilityLabel !== 'undefined'
        ? accessibilityLabel
        : getLabelText(scene);
    const badge = renderBadge ? renderBadge(scene) : null;
    return (
      <TouchableItem
        borderless
        testID={getTestID(scene)}
        accessible={getAccessible(scene)}
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={isFocused ? ['button', 'selected'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="tab"
        accessibilityStates={isFocused ? ['selected'] : []}
        pressColor={pressColor}
        pressOpacity={pressOpacity}
        delayPressIn={0}
        onLayout={onLayout}
        onPress={onPress}
        onLongPress={onLongPress}
        style={tabContainerStyle}>
        <View pointerEvents="none" style={[styles.item, tabStyle]}>
          {icon}
          {label}
          {badge != null ? <View style={styles.badge}>{badge}</View> : null}
        </View>
      </TouchableItem>
    );
  }
}
Tab.defaultProps = {
  pressOpacity: 0.5,
};
export default withTheme(Tab);
