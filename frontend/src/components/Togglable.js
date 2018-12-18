import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class Togglable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;
    const showWhenVisible = { display: visible ? '' : 'none' };
    const hideWhenVisible = { display: visible ? 'none' : '' };

    return (
      <div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button negative onClick={this.toggleVisibility}>
            {this.props.hideButtonLabel}
          </Button>
        </div>
        <div style={hideWhenVisible}>
          <Button onClick={this.toggleVisibility}>
            {this.props.displayButtonLabel}
          </Button>
        </div>
      </div>
    );
  }
}

Togglable.propTypes = {
  hideButtonLabel: PropTypes.string.isRequired,
  displayButtonLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Togglable;
