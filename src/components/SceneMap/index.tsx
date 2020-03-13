import * as React from 'react';
interface ISceneComponentProps extends React.HTMLAttributes<Element> {
  component: (...args: any[]) => any;
  rest?: any;
}
class SceneComponent extends React.PureComponent<ISceneComponentProps, {}> {
  render() {
    const {component, ...rest} = this.props;
    return React.createElement(component, rest);
  }
}
export default function SceneMap(scenes) {
  // eslint-disable-next-line react/prop-types
  return ({route, jumpTo, position}) => {
    return (
      <SceneComponent
        key={route.key}
        component={scenes[route.key]}
        route={route}
        jumpTo={jumpTo}
        position={position}
      />
    );
  };
}
