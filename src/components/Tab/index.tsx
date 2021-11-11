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
  renderIcon?: (props: {route: {}; focused: boolean}) => any;
  renderBadge?: (...args: any[]) => any;
  getLabelText?: (...args: any[]) => any;
  getTestID?: (...args: any[]) => any;
  getAccessibilityLabel?: (...args: any[]) => any;
  getAccessible?: (...args: any[]) => any;
  theme?: any;
  pressColor?: string;
  pressOpacity?: number;
  labelStyle?: {};
  activeLabelStyle?: {};
  style?: {};
  onLayout?: (...args: any[]) => any;
  onPress?: (...args: any[]) => any;
  onLongPress?: (...args: any[]) => any;
  segmentView?: boolean;
  segmentLineColor?: string;
  activeTabBackground?: string;
}

const getActiveOpacity = memoize(
  (position: any, routes: any, tabIndex: any) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_: any, i: number) => i);
      return Animated.interpolateNode(position, {
        inputRange,
        outputRange: inputRange.map((i: any) => (i === tabIndex ? 1 : 0)),
      });
    } else {
      return 1;
    }
  },
);
const getInactiveOpacity = memoize(
  (position: any, routes: any, tabIndex: any) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_: any, i: number) => i);
      return Animated.interpolateNode(position, {
        inputRange,
        outputRange: inputRange.map((i: any) => (i === tabIndex ? 0 : 1)),
      });
    } else {
      return 0;
    }
  },
);

const Tab: React.FC<ITabProps> = ({
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
  pressColor = theme.colors.gray,
  pressOpacity = 0.5,
  labelStyle,
  activeLabelStyle,
  style,
  onLayout,
  onPress,
  onLongPress,
  segmentView,
  segmentLineColor,
  activeTabBackground,
}) => {
  const tabIndex = navigationState.routes.indexOf(route);
  const isFocused = navigationState.index === tabIndex;
  const lastTab = tabIndex === navigationState.routes.length - 1;
  const tabBeforeFocused = tabIndex === navigationState.index - 1;
  const showSegmentBorder = !isFocused && !lastTab && !tabBeforeFocused;
  const activeOpacity = getActiveOpacity(
    position,
    navigationState.routes,
    tabIndex,
  );
  const inactiveOpacity = getInactiveOpacity(
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
    });
    const inactiveIcon = renderIcon({
      route,
      focused: false,
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
        ({route}: any) => {
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
                      isFocused && styles.activeLabel,
                      icon ? {marginTop: 0} : null,
                      labelStyle,
                      isFocused && activeLabelStyle,
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
                  isFocused && styles.activeLabel,
                  icon ? {marginTop: 0} : null,
                  labelStyle,
                  isFocused && activeLabelStyle,
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
    });
    const inactiveLabel = renderLabel({
      route,
      focused: false,
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
};

export default withTheme(Tab);
