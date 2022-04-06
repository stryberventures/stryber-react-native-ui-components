import * as React from 'react';
import {LayoutChangeEvent, StyleProp, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import TabBar, {ITabBarProps} from './TabBar';
import SceneView from './SceneView';
import Pager, {IPagerProps} from './Pager';
import styles from './styles';
import {
  Layout,
  NavigationState,
  PagerCommonProps,
  Route,
  SceneRendererProps,
} from './types';
import {useState} from 'react';

interface ITabViewProps<T extends Route> extends PagerCommonProps {
  position?: Animated.Value<number>;
  onIndexChange: (index: number) => void;
  navigationState: NavigationState<T>;
  renderScene: (
    props: SceneRendererProps & {
      route: T;
    },
  ) => React.ReactNode;
  renderLazyPlaceholder: (props: {route: T}) => React.ReactNode;
  renderTabBar: (
    props: SceneRendererProps & {
      navigationState: NavigationState<T>;
      segmentView?: boolean;
      segmentLineColor?: string;
      textColor?: string;
      activeTabBackground?: string;
      activeTabTextColor?: string;
    },
  ) => React.ReactNode;
  tabBarPosition: 'top' | 'bottom';
  initialLayout?: {width?: number; height?: number};
  lazy: ((props: {route: T}) => boolean) | boolean;
  lazyPreloadDistance: number;
  removeClippedSubviews?: boolean;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  gestureHandlerProps: React.ComponentProps<typeof PanGestureHandler>;
  renderPager: (props: IPagerProps<T>) => React.ReactNode;
  segmentView?: boolean;
  segmentLineColor?: string;
  textColor?: string;
  activeTabBackground?: string;
  activeTabTextColor?: string;
}

const TabView = <T extends Route>({
  initialLayout,
  navigationState,
  onIndexChange,
  position: positionListener,
  onSwipeStart,
  onSwipeEnd,
  lazy,
  lazyPreloadDistance,
  removeClippedSubviews,
  keyboardDismissMode,
  swipeEnabled,
  swipeVelocityImpact,
  timingConfig,
  springConfig,
  tabBarPosition,
  renderTabBar,
  renderScene,
  renderLazyPlaceholder,
  sceneContainerStyle,
  style,
  gestureHandlerProps,
  springVelocityScale,
  renderPager,
  segmentView,
  segmentLineColor,
  textColor,
  activeTabBackground,
  activeTabTextColor,
}: ITabViewProps<T>) => {
  const [layout, setLayout] = useState<Layout>({
    width: 0,
    height: 0,
    ...initialLayout,
  });

  const jumpToIndex = (index: number) => {
    if (index !== navigationState.index) {
      onIndexChange!(index);
    }
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const {height, width} = e.nativeEvent.layout;
    if (layout.width === width && layout.height === height) {
      return;
    }
    setLayout({
      height,
      width,
    });
  };

  return (
    <View onLayout={handleLayout} style={[styles.pager, style]}>
      {renderPager!({
        navigationState,
        layout,
        keyboardDismissMode,
        swipeEnabled,
        swipeVelocityImpact,
        timingConfig,
        springConfig,
        onSwipeStart,
        onSwipeEnd,
        onIndexChange: jumpToIndex,
        springVelocityScale,
        removeClippedSubviews,
        gestureHandlerProps,
        children: ({
          position,
          render,
          addListener,
          removeListener,
          jumpTo,
        }: any) => {
          // All props here must not change between re-renders
          // This is crucial to optimizing the routes with PureComponent
          const sceneRendererProps = {
            position,
            layout,
            jumpTo,
          };
          return (
            <React.Fragment>
              {positionListener ? (
                <Animated.Code
                  exec={Animated.set(positionListener, position)}
                />
              ) : null}
              {tabBarPosition === 'top' &&
                renderTabBar!({
                  ...sceneRendererProps,
                  navigationState,
                  segmentView,
                  segmentLineColor,
                  textColor,
                  activeTabBackground,
                  activeTabTextColor,
                })}
              {render(
                navigationState.routes.map((route, i) => {
                  return (
                    <SceneView
                      {...sceneRendererProps}
                      addListener={addListener}
                      removeListener={removeListener}
                      key={route.key}
                      index={i}
                      lazy={lazy}
                      lazyPreloadDistance={lazyPreloadDistance}
                      navigationState={navigationState}
                      style={sceneContainerStyle}>
                      {({loading}: any) =>
                        loading
                          ? renderLazyPlaceholder!({route})
                          : renderScene!({
                              ...sceneRendererProps,
                              route,
                            })
                      }
                    </SceneView>
                  );
                }),
              )}
              {tabBarPosition === 'bottom' &&
                renderTabBar!({
                  ...sceneRendererProps,
                  navigationState,
                  segmentView,
                  segmentLineColor,
                  textColor,
                  activeTabBackground,
                  activeTabTextColor,
                })}
            </React.Fragment>
          );
        },
      })}
    </View>
  );
};

TabView.defaultProps = {
  tabBarPosition: 'top',
  renderTabBar: <P extends Route>(props: ITabBarProps<P>) => (
    <TabBar {...props} />
  ),
  renderLazyPlaceholder: () => null,
  keyboardDismissMode: 'auto',
  swipeEnabled: true,
  lazy: false,
  lazyPreloadDistance: 0,
  removeClippedSubviews: false,
  springConfig: {},
  timingConfig: {},
  gestureHandlerProps: {},
  renderPager: (props: IPagerProps<any>) => <Pager {...props} />,
  segmentView: false,
};

export default TabView;
