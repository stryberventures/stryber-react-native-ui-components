import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import withTheme from '../withTheme';
import Button from '../Button';

import getStyles from './styles';

class DropdownItem extends PureComponent {
  static defaultProps = {
    color: 'transparent',
    disabledColor: 'transparent',
    rippleContainerBorderRadius: 0,
    shadeBorderRadius: 0,
  };

  static propTypes = {
    ...Button.propTypes,

    index: PropTypes.number.isRequired,
  };

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

export default withTheme(DropdownItem);
