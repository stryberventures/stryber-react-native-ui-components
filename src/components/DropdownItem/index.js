import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import withTheme from '../withTheme';
import Button from '../Button';

import getStyles from './styles';

class DropdownItem extends PureComponent {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    let {onPress, index} = this.props;

    if (typeof onPress === 'function') {
      onPress(index);
    }
  }

  render() {
    const {children, style, theme, index, ...props} = this.props;
    const styles = getStyles(theme);

    return (
      <Button
        {...props}
        style={[styles.container, style]}
        ripple
        onPress={this.onPress}>
        {children}
      </Button>
    );
  }
}

DropdownItem.defaultProps = {
  rippleContainerBorderRadius: 0,
  shadeBorderRadius: 0,
};

DropdownItem.propTypes = {
  ...Button.propTypes,

  index: PropTypes.number.isRequired,
};

export default withTheme(DropdownItem);
