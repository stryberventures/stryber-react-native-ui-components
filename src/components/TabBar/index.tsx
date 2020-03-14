import * as React from 'react';
import {
  StyleSheet,
  View,
  I18nManager,
  Platform,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Tab from '../Tab';
import TabBarIndicator from './TabBarIndicator';
import {memoize} from '../other/utils';
import styles from './styles';
interface ITabBarProps {
  position?: {};
  navigationState?: {
    routes?: any[];
    index?: number;
  };
  jumpTo?: (...args: any[]) => any;
  scrollEnabled?: boolean;
  bounces?: boolean;
  getAccessibilityLabel?: (...args: any[]) => any;
  getAccessible?: (...args: any[]) => any;
  getLabelText?: (...args: any[]) => any;
  getTestID?: (...args: any[]) => any;
  renderBadge?: (...args: any[]) => any;
  renderIcon?: (...args: any[]) => any;
  renderLabel?: (...args: any[]) => any;
  activeColor?: string;
  inactiveColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  onTabPress?: (...args: any[]) => any;
  onTabLongPress?: (...args: any[]) => any;
  tabStyle?: any;
  labelStyle?: any;
  indicatorStyle?: any;
  contentContainerStyle?: any;
  style?: any;
  indicatorContainerStyle?: any;
  renderIndicator?: (...args: any[]) => any;
}
type TabBarState = {
  layout?: any;
  tabWidths?: any;
  height?: any;
  width?: any;
};
export default class TabBar extends React.Component<ITabBarProps, TabBarState> {
  static defaultProps: any;
  state = {
    layout: {width: 0, height: 0},
    tabWidths: {},
  };
  componentDidUpdate(prevProps, prevState, _) {
    const {navigationState} = this.props;
    const {layout, tabWidths} = this.state;
    if (
      prevProps.navigationState.routes.length !==
        navigationState.routes.length ||
      prevProps.navigationState.index !== navigationState.index ||
      prevState.layout.width !== layout.width ||
      prevState.tabWidths !== tabWidths
    ) {
      if (
        this.getFlattenedTabWidth(this.props.tabStyle) === 'auto' &&
        !(
          layout.width &&
          navigationState.routes.every(
            r => typeof tabWidths[r.key] === 'number',
          )
        )
      ) {
        return;
      }
      this.resetScroll(navigationState.index);
    }
  }
  measuredTabWidths = {};
  scrollAmount = new Animated.Value(0);
  scrollView;
  getFlattenedTabWidth = style => {
    const tabStyle = StyleSheet.flatten(style);
    return tabStyle ? tabStyle.width : undefined;
  };
  getComputedTabWidth = (
    index,
    layout,
    routes,
    scrollEnabled,
    tabWidths,
    flattenedWidth,
  ) => {
    if (flattenedWidth === 'auto') {
      return tabWidths[routes[index].key] || 0;
    }
    switch (typeof flattenedWidth) {
      case 'number':
        return flattenedWidth;
      case 'string':
        if (flattenedWidth.endsWith('%')) {
          const width = parseFloat(flattenedWidth);
          if (Number.isFinite(width)) {
            return layout.width * (width / 100);
          }
        }
    }
    if (scrollEnabled) {
      return (layout.width / 5) * 2;
    }
    return layout.width / routes.length;
  };
  getMemoizedTabWidthGettter = memoize(
    (layout, routes, scrollEnabled, tabWidths, flattenedWidth) => i =>
      this.getComputedTabWidth(
        i,
        layout,
        routes,
        scrollEnabled,
        tabWidths,
        flattenedWidth,
      ),
  );
  getMaxScrollDistance = (tabBarWidth, layoutWidth) =>
    tabBarWidth - layoutWidth;
  getTabBarWidth = (props, state) => {
    const {layout, tabWidths} = state;
    const {scrollEnabled, tabStyle} = props;
    const {routes} = props.navigationState;
    return routes.reduce(
      (acc, _, i) =>
        acc +
        this.getComputedTabWidth(
          i,
          layout,
          routes,
          scrollEnabled,
          tabWidths,
          this.getFlattenedTabWidth(tabStyle),
        ),
      0,
    );
  };
  normalizeScrollValue = (props, state, value) => {
    const {layout} = state;
    const tabBarWidth = this.getTabBarWidth(props, state);
    const maxDistance = this.getMaxScrollDistance(tabBarWidth, layout.width);
    const scrollValue = Math.max(Math.min(value, maxDistance), 0);
    if (Platform.OS === 'android' && I18nManager.isRTL) {
      // On Android, scroll value is not applied in reverse in RTL
      // so we need to manually adjust it to apply correct value
      return maxDistance - scrollValue;
    }
    return scrollValue;
  };
  getScrollAmount = (props, state, index) => {
    const {layout, tabWidths} = state;
    const {scrollEnabled, tabStyle} = props;
    const {routes} = props.navigationState;
    const centerDistance = Array.from({length: index + 1}).reduce(
      (total, _, i) => {
        const tabWidth = this.getComputedTabWidth(
          i,
          layout,
          routes,
          scrollEnabled,
          tabWidths,
          this.getFlattenedTabWidth(tabStyle),
        );
        return total + (index === i ? tabWidth / 2 : tabWidth);
      },
      0,
    );
    const scrollAmount = centerDistance - layout.width / 2;
    return this.normalizeScrollValue(props, state, scrollAmount);
  };
  resetScroll = index => {
    if (this.props.scrollEnabled) {
      this.scrollView &&
        this.scrollView.scrollTo({
          x: this.getScrollAmount(this.props, this.state, index),
          animated: true,
        });
    }
  };
  handleLayout = e => {
    const {height, width} = e.nativeEvent.layout;
    if (
      this.state.layout.width === width &&
      this.state.layout.height === height
    ) {
      return;
    }
    // If we don't delay this state update, the UI gets stuck in weird state
    // Maybe an issue in Reanimated?
    // https://github.com/react-native-community/react-native-tab-view/issues/877
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        this.setState({
          layout: {
            height,
            width,
          },
        }),
      ),
    );
  };
  getTranslateX = memoize((scrollAmount, maxScrollDistance) =>
    Animated.multiply(
      Platform.OS === 'android' && I18nManager.isRTL
        ? Animated.sub(maxScrollDistance, scrollAmount)
        : scrollAmount,
      I18nManager.isRTL ? 1 : -1,
    ),
  );
  render() {
    const {
      position,
      navigationState,
      jumpTo,
      scrollEnabled,
      bounces,
      getAccessibilityLabel,
      getAccessible,
      getLabelText,
      getTestID,
      renderBadge,
      renderIcon,
      renderLabel,
      activeColor,
      inactiveColor,
      pressColor,
      pressOpacity,
      onTabPress,
      onTabLongPress,
      tabStyle,
      labelStyle,
      indicatorStyle,
      contentContainerStyle,
      style,
      indicatorContainerStyle,
    } = this.props;
    const {layout, tabWidths} = this.state;
    const {routes} = navigationState;
    const isWidthDynamic = this.getFlattenedTabWidth(tabStyle) === 'auto';
    const tabBarWidth = this.getTabBarWidth(this.props, this.state);
    const tabBarWidthPercent = `${routes.length * 40}%`;
    const translateX = this.getTranslateX(
      this.scrollAmount,
      this.getMaxScrollDistance(tabBarWidth, layout.width),
    );
    return (
      <Animated.View
        onLayout={this.handleLayout}
        style={[styles.tabBar, style]}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicatorContainer,
            scrollEnabled ? {transform: [{translateX}]} : null,
            tabBarWidth
              ? {width: tabBarWidth}
              : scrollEnabled
              ? {width: tabBarWidthPercent}
              : null,
            indicatorContainerStyle,
          ]}>
          {this.props.renderIndicator({
            position,
            layout,
            navigationState,
            jumpTo,
            width: isWidthDynamic ? 'auto' : `${100 / routes.length}%`,
            style: indicatorStyle,
            getTabWidth: this.getMemoizedTabWidthGettter(
              layout,
              routes,
              scrollEnabled,
              tabWidths,
              this.getFlattenedTabWidth(tabStyle),
            ),
          })}
        </Animated.View>
        <View style={styles.scroll}>
          <Animated.ScrollView
            horizontal
            accessibilityRole="tablist"
            keyboardShouldPersistTaps="handled"
            scrollEnabled={scrollEnabled}
            bounces={bounces}
            alwaysBounceHorizontal={false}
            scrollsToTop={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            overScrollMode="never"
            contentContainerStyle={[
              styles.tabContent,
              scrollEnabled
                ? {width: tabBarWidth || tabBarWidthPercent}
                : styles.container,
              contentContainerStyle,
            ]}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {x: this.scrollAmount},
                },
              },
            ])}
            ref={el => {
              this.scrollView = el && el.getNode();
            }}>
            {routes.map((route: T) => (
              <Tab
                onLayout={
                  isWidthDynamic
                    ? e => {
                        this.measuredTabWidths[route.key] =
                          e.nativeEvent.layout.width;
                        if (
                          routes.every(
                            r =>
                              typeof this.measuredTabWidths[r.key] === 'number',
                          )
                        ) {
                          this.setState({
                            tabWidths: {...this.measuredTabWidths},
                          });
                        }
                      }
                    : undefined
                }
                key={route.key}
                position={position}
                route={route}
                navigationState={navigationState}
                getAccessibilityLabel={getAccessibilityLabel}
                getAccessible={getAccessible}
                getLabelText={getLabelText}
                getTestID={getTestID}
                renderBadge={renderBadge}
                renderIcon={renderIcon}
                renderLabel={renderLabel}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                pressColor={pressColor}
                pressOpacity={pressOpacity}
                onPress={() => {
                  const event: Scene<T> & Event = {
                    route,
                    defaultPrevented: false,
                    preventDefault: () => {
                      event.defaultPrevented = true;
                    },
                  };
                  onTabPress && onTabPress(event);
                  if (event.defaultPrevented) {
                    return;
                  }
                  this.props.jumpTo(route.key);
                }}
                onLongPress={() => onTabLongPress && onTabLongPress({route})}
                labelStyle={labelStyle}
                style={tabStyle}
              />
            ))}
          </Animated.ScrollView>
        </View>
      </Animated.View>
    );
  }
}
TabBar.defaultProps = {
  getLabelText: ({route}) => route.title,
  getAccessible: ({route}) =>
    typeof route.accessible !== 'undefined' ? route.accessible : true,
  getAccessibilityLabel: ({route}) =>
    typeof route.accessibilityLabel === 'string'
      ? route.accessibilityLabel
      : typeof route.title === 'string'
      ? route.title
      : undefined,
  getTestID: ({route}) => route.testID,
  renderIndicator: props => <TabBarIndicator {...props} />,
};
