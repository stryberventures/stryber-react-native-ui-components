import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import styles from './styles';
interface ISceneViewProps {
  navigationState?: {
    index?: number;
  };
  index?: number;
  layout?: any;
  style?: any;
  lazyPreloadDistance?: number;
  lazy?: boolean;
  removeListener?: (...args: any[]) => any;
  addListener?: (...args: any[]) => any;
}
type SceneViewState = {
  loading?: boolean;
};
export default class SceneView extends React.Component<
  ISceneViewProps,
  SceneViewState
> {
  static getDerivedStateFromProps(
    props: ISceneViewProps,
    state: SceneViewState,
  ) {
    if (
      state.loading &&
      Math.abs(props.navigationState!.index! - props.index!) <=
        props.lazyPreloadDistance!
    ) {
      // Always render the route when it becomes focused
      return {loading: false};
    }
    return null;
  }
  state = {
    loading:
      Math.abs(this.props.navigationState!.index! - this.props.index!) >
      this.props.lazyPreloadDistance!,
  };
  componentDidMount() {
    if (this.props.lazy) {
      // If lazy mode is enabled, listen to when we enter screens
      this.props.addListener!('enter', this.handleEnter);
    } else if (this.state.loading) {
      // If lazy mode is not enabled, render the scene with a delay if not loaded already
      // This improves the initial startup time as the scene is no longer blocking
      setTimeout(() => this.setState({loading: false}), 0);
    }
  }
  componentDidUpdate(
    prevProps: ISceneViewProps,
    prevState: SceneViewState,
    _: any,
  ) {
    if (
      this.props.lazy !== prevProps.lazy ||
      this.state.loading !== prevState.loading
    ) {
      // We only need the listener if the tab hasn't loaded yet and lazy is enabled
      if (this.props.lazy && this.state.loading) {
        this.props.addListener!('enter', this.handleEnter);
      } else {
        this.props.removeListener!('enter', this.handleEnter);
      }
    }
  }
  componentWillUnmount() {
    this.props.removeListener!('enter', this.handleEnter);
  }
  handleEnter = (value: any) => {
    const {index} = this.props;
    // If we're entering the current route, we need to load it
    if (value === index && this.state.loading) {
      this.setState({loading: false});
    }
  };
  render() {
    const {navigationState, index, layout, style} = this.props;
    const {loading} = this.state;
    const focused = navigationState!.index === index;
    return (
      <View
        accessibilityElementsHidden={!focused}
        importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
        style={[
          styles.route,
          // If we don't have the layout yet, make the focused screen fill the container
          // This avoids delay before we are able to render pages side by side
          layout.width
            ? {width: layout.width}
            : focused
            ? StyleSheet.absoluteFill
            : null,
          style,
        ]}>
        {
          // When layout is not available, we must not render unfocused routes
          // so that the focused route can fill the screen
          // @ts-ignore
          focused || layout.width ? this.props.children({loading}) : null
        }
      </View>
    );
  }
}
