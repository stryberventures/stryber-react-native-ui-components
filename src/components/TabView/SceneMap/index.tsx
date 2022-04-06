import * as React from 'react';
import type {SceneRendererProps} from '../types';

const SceneComponent = <T extends {component: React.ComponentType<any>}>({
  component,
  ...rest
}: T) => React.createElement(component, rest);

const SceneMap = <T extends any>(scenes: {
  [key: string]: React.ComponentType<T>;
}) => {
  return ({route, jumpTo, position}: SceneRendererProps & {route: any}) => (
    <SceneComponent
      key={route.key}
      component={scenes[route.key]}
      route={route}
      jumpTo={jumpTo}
      position={position}
    />
  );
};

export default SceneMap;
