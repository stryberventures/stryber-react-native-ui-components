import React from 'react';
import {View, ViewPropTypes} from 'react-native';
import Animated from 'react-native-reanimated';
import PropTypes from 'prop-types';

import TabBar from '../TabBar';
import SceneView from './SceneView';
import Pager from './Pager';
import styles from './styles';

export default class TabView extends React.Component {
  state = {
    layout: {width: 0, height: 0, ...this.props.initialLayout},
  };

  jumpToIndex = (index: number) => {
    if (index !== this.props.navigationState.index) {
      this.props.onIndexChange(index);
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
    } = this.props;
    const {layout} = this.state;

    return (
      <View onLayout={this.handleLayout} style={[styles.pager, style]}>
        {renderPager({
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
          }) => {
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
                  renderTabBar({
                    ...sceneRendererProps,
                    navigationState,
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
                        {({loading}) =>
                          loading
                            ? renderLazyPlaceholder({route})
                            : renderScene({
                                ...sceneRendererProps,
                                route,
                              })
                        }
                      </SceneView>
                    );
                  }),
                )}
                {tabBarPosition === 'bottom' &&
                  renderTabBar({
                    ...sceneRendererProps,
                    navigationState,
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
  renderTabBar: props => <TabBar {...props} />,
  renderLazyPlaceholder: () => null,
  keyboardDismissMode: 'auto',
  swipeEnabled: true,
  lazy: false,
  lazyPreloadDistance: 0,
  removeClippedSubviews: false,
  springConfig: {},
  timingConfig: {},
  gestureHandlerProps: {},
  renderPager: props => <Pager {...props} />,
};

TabView.propTypes = {
  position: PropTypes.shape({}),
  onSwipeStart: PropTypes.func,
  onSwipeEnd: PropTypes.func,
  navigationState: PropTypes.shape({index: PropTypes.number}).isRequired,
  lazy: PropTypes.bool,
  lazyPreloadDistance: PropTypes.number,
  removeClippedSubviews: PropTypes.bool,
  keyboardDismissMode: PropTypes.oneOf(['auto', 'on-drag', 'none']),
  swipeEnabled: PropTypes.bool,
  swipeVelocityImpact: PropTypes.bool,
  timingConfig: PropTypes.shape({}),
  springConfig: PropTypes.shape({}),
  tabBarPosition: PropTypes.oneOf(['top', 'bottom']),
  renderTabBar: PropTypes.func,
  renderScene: PropTypes.func,
  renderLazyPlaceholder: PropTypes.func,
  sceneContainerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  gestureHandlerProps: PropTypes.shape({}),
  springVelocityScale: PropTypes.shape({}),
  renderPager: PropTypes.func,
  initialLayout: PropTypes.shape({}),
  onIndexChange: PropTypes.func,
};
