import * as React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import TabBar from '../TabBar';
import SceneView from './SceneView';
import Pager from './Pager';
import styles from './styles';
interface ITabViewProps {
  position?: any;
  onSwipeStart?: (...args: any[]) => any;
  onSwipeEnd?: (...args: any[]) => any;
  navigationState: any;
  lazy?: boolean;
  lazyPreloadDistance?: number;
  removeClippedSubviews?: boolean;
  keyboardDismissMode?: 'auto' | 'on-drag' | 'none';
  swipeEnabled?: boolean;
  swipeVelocityImpact?: boolean;
  timingConfig?: {};
  springConfig?: {};
  tabBarPosition?: 'top' | 'bottom';
  renderTabBar?: (...args: any[]) => any;
  renderScene?: (...args: any[]) => any;
  renderLazyPlaceholder?: (...args: any[]) => any;
  sceneContainerStyle?: any;
  style?: any;
  gestureHandlerProps?: {};
  springVelocityScale?: {};
  renderPager?: (...args: any[]) => any;
  initialLayout?: {};
  onIndexChange?: (...args: any[]) => any;
  index?: any;
  segmentView?: boolean;
  segmentLineColor?: string;
  textColor?: string;
  activeTabBackground?: string;
  activeTabTextColor?: string;
}
type TabViewState = {
  layout?: {height: any; width: any};
  height?: any;
  width?: any;
};
export default class TabView extends React.Component<
  ITabViewProps,
  TabViewState
> {
  static defaultProps: any;
  state = {
    layout: {width: 0, height: 0, ...this.props.initialLayout},
  };
  jumpToIndex = (index: number) => {
    if (index !== this.props.navigationState.index) {
      this!.props!.onIndexChange!(index);
    }
  };
  handleLayout = (e: any) => {
    const {height, width} = e.nativeEvent.layout;
    if (
      this.state.layout.width === width &&
      this.state.layout.height === height
    ) {
      return;
    }
    this.setState({
      layout: {
        height,
        width,
      },
    });
  };
  render() {
    const {
      position: positionListener,
      onSwipeStart,
      onSwipeEnd,
      navigationState,
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
    } = this.props;
    const {layout} = this.state;
    return (
      <View onLayout={this.handleLayout} style={[styles.pager, style]}>
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
          onIndexChange: this.jumpToIndex,
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
            // All of the props here must not change between re-renders
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
                  navigationState.routes.map((route: any, i: number) => {
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
  }
}
TabView.defaultProps = {
  tabBarPosition: 'top',
  renderTabBar: (props: any) => <TabBar {...props} />,
  renderLazyPlaceholder: () => null,
  keyboardDismissMode: 'auto',
  swipeEnabled: true,
  lazy: false,
  lazyPreloadDistance: 0,
  removeClippedSubviews: false,
  springConfig: {},
  timingConfig: {},
  gestureHandlerProps: {},
  renderPager: (props: any) => <Pager {...props} />,
  segmentView: false,
};
