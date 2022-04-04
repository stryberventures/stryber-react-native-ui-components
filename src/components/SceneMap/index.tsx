import * as React from 'react';

interface ISceneComponentProps {
  component: (...args: any[]) => any;
  rest?: any;
}
//TODO: Check if we need this component
class SceneComponent extends React.PureComponent<ISceneComponentProps, {}> {
  render() {
    const {component, ...rest} = this.props;
    return React.createElement(component, rest);
  }
}
export default function SceneMap(scenes: any) {
  return ({route, jumpTo, position}: any) => {
    return (
      <SceneComponent
        key={route.key}
        component={scenes[route.key]}
        // @ts-ignore
        route={route}
        jumpTo={jumpTo}
        position={position}
      />
    );
  };
}
