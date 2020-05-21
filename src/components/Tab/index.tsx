import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import TouchableItem from './TouchableItem';
import Animated from 'react-native-reanimated';
import withTheme from '../withTheme';
import {memoize} from '../other/utils';
import styles from './styles';
interface ITabProps {
  route: {};
  position: {};
  navigationState: any;
  renderLabel?: (...args: any[]) => any;
  renderIcon?: (...args: any[]) => any;
  renderBadge?: (...args: any[]) => any;
  getLabelText?: (...args: any[]) => any;
  getTestID?: (...args: any[]) => any;
  getAccessibilityLabel?: (...args: any[]) => any;
  getAccessible?: (...args: any[]) => any;
  theme?: any;
  blackColor?: string;
  whiteColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  labelStyle?: {};
  style?: {};
  onLayout?: (...args: any[]) => any;
  onPress?: (...args: any[]) => any;
  onLongPress?: (...args: any[]) => any;
  segmentView?: boolean;
  segmentLineColor?: string;
  textColor?: string;
  activeTabBackground?: string;
  activeTabTextColor?: string;
}
class Tab extends React.Component<ITabProps, {}> {
  static defaultProps: any;
  getActiveOpacity = memoize((position: any, routes: any, tabIndex: any) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_: any, i: number) => i);
      return Animated.interpolate(position, {
        inputRange,
        outputRange: inputRange.map((i: any) => (i === tabIndex ? 1 : 0)),
      });
    } else {
      return 1;
    }
  });
  getInactiveOpacity = memoize((position: any, routes: any, tabIndex: any) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_: any, i: number) => i);
      return Animated.interpolate(position, {
        inputRange,
        outputRange: inputRange.map((i: any) => (i === tabIndex ? 0 : 1)),
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
      blackColor = theme.colors.black,
      whiteColor = theme.colors.white,
      pressColor = theme.colors.gray,
      pressOpacity,
      labelStyle,
      style,
      onLayout,
      onPress,
      onLongPress,
      segmentView,
      segmentLineColor,
      textColor,
      activeTabBackground,
      activeTabTextColor,
    } = this.props;
    const tabIndex = navigationState.routes.indexOf(route);
    const isFocused = navigationState.index === tabIndex;
    const lastTab = tabIndex === navigationState.routes.length - 1;
    const tabBeforeFocused = tabIndex === navigationState.index - 1;
    const showSegmentBorder = !isFocused && !lastTab && !tabBeforeFocused;
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
    let icon: any = null;
    let label = null;
    if (renderIcon) {
      const activeIcon = renderIcon({
        route,
        focused: true,
        color: blackColor,
      });
      const inactiveIcon = renderIcon({
        route,
        focused: false,
        color: blackColor,
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
          ({route, color}: any) => {
            const labelText = getLabelText!({route});
            const activeSegmentLabelWrapper = {
              backgroundColor: activeTabBackground || theme.colors.primary,
            };
            const segmentLineStyle = {
              backgroundColor: segmentLineColor || theme.colors.blueGray,
            };
            if (typeof labelText === 'string') {
              return segmentView ? (
                <View
                  style={[
                    styles.segmentLabelWrapper,
                    isFocused && activeSegmentLabelWrapper,
                  ]}>
                  <View style={{flex: 1}}>
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
                  </View>
                  {showSegmentBorder && (
                    <View style={[styles.segmentBorder, segmentLineStyle]} />
                  )}
                </View>
              ) : (
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
        color:
          isFocused && segmentView
            ? activeTabTextColor || whiteColor
            : textColor || blackColor,
      });
      const inactiveLabel = renderLabel({
        route,
        focused: false,
        color: textColor || blackColor,
      });
      label = (
        <View>
          <Animated.View
            style={[
              segmentView && styles.labelWrapper,
              {opacity: inactiveOpacity},
            ]}>
            {inactiveLabel}
          </Animated.View>
          <Animated.View
            style={[
              segmentView && styles.labelWrapper,
              StyleSheet.absoluteFill,
              !segmentView && {opacity: activeOpacity},
            ]}>
            {activeLabel}
          </Animated.View>
        </View>
      );
    }
    const tabStyle: any = StyleSheet.flatten(style);
    const isWidthSet = tabStyle && tabStyle.width !== undefined;
    const tabContainerStyle = isWidthSet ? null : {flex: 1};
    const scene = {route};
    let accessibilityLabel = getAccessibilityLabel!(scene);
    accessibilityLabel =
      typeof accessibilityLabel !== 'undefined'
        ? accessibilityLabel
        : getLabelText!(scene);
    const badge = renderBadge ? renderBadge(scene) : null;
    return (
      // @ts-ignore
      <TouchableItem
        borderless
        testID={getTestID!(scene)}
        accessible={getAccessible!(scene)}
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
        <View
          pointerEvents="none"
          style={[styles.item, segmentView && styles.segmentItem, tabStyle]}>
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
