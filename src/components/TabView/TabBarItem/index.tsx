import * as React from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import TouchableItem from './TouchableItem';
import Animated from 'react-native-reanimated';
import styles from './styles';
import {useTheme} from '../../Theme';
import {NavigationState, Route, Scene} from '../types';
import {memoize} from '../../../utils';

export interface ITabBarItemProps<T extends Route> {
  position: Animated.Node<number>;
  route: T;
  navigationState: NavigationState<T>;
  activeColor?: string;
  inactiveColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  getLabelText: (scene: Scene<T>) => string | undefined;
  getAccessible: (scene: Scene<T>) => boolean | undefined;
  getAccessibilityLabel: (scene: Scene<T>) => string | undefined;
  getTestID: (scene: Scene<T>) => string | undefined;
  renderLabel?: (scene: {
    route: T;
    focused: boolean;
    color?: string;
  }) => React.ReactNode;
  renderIcon?: (scene: {
    route: T;
    focused: boolean;
    color?: string;
  }) => React.ReactNode;
  renderBadge?: (scene: Scene<T>) => React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress: () => void;
  onLongPress: () => void;
  labelStyle?: StyleProp<TextStyle>;
  style: StyleProp<ViewStyle>;
  segmentView?: boolean;
  segmentLineColor?: string;
  activeLabelStyle?: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
  activeTabBackground?: string;
}

const getActiveOpacity = memoize(
  (position: Animated.Node<number>, routes: Route[], tabIndex: number) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_, i) => i);

      return Animated.interpolateNode(position, {
        inputRange,
        outputRange: inputRange.map(i => (i === tabIndex ? 1 : 0)),
      });
    } else {
      return 1;
    }
  },
);

const getInactiveOpacity = memoize(
  (position: Animated.Node<number>, routes: Route[], tabIndex: number) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_: Route, i: number) => i);

      return Animated.interpolateNode(position, {
        inputRange,
        outputRange: inputRange.map((i: number) => (i === tabIndex ? 0 : 1)),
      });
    } else {
      return 0;
    }
  },
);

const TabBarItem = <T extends Route>({
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
  pressColor,
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
}: ITabBarItemProps<T>) => {
  const {theme} = useTheme();
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
          <Animated.View style={{opacity: inactiveOpacity as number}}>
            {inactiveIcon}
          </Animated.View>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {opacity: activeOpacity as number},
            ]}>
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
            {opacity: inactiveOpacity as number},
          ]}>
          {inactiveLabel}
        </Animated.View>
        <Animated.View
          style={[
            segmentView && styles.labelWrapper,
            StyleSheet.absoluteFill,
            !segmentView && {opacity: activeOpacity as number},
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
    <TouchableItem
      borderless
      testID={getTestID!(scene)}
      accessible={getAccessible!(scene)}
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={isFocused ? ['button', 'selected'] : 'button'}
      accessibilityComponentType="button"
      accessibilityRole="tab"
      accessibilityStates={isFocused ? ['selected'] : []}
      pressColor={pressColor || theme.colors.gray}
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

export default TabBarItem;
