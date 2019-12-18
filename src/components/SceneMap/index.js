import React from 'react';
import PropTypes from 'prop-types';

class SceneComponent extends React.PureComponent {
  render() {
    const {component, ...rest} = this.props;
    return React.createElement(component, rest);
  }
}

SceneComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

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
