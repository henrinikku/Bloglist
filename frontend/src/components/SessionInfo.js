/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../reducers/userReducer';

const SessionInfo = ({ name, logout }) => (
  <Button negative onClick={logout}>
    Logout {name}
  </Button>
);

SessionInfo.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(
  ({ user }) => ({ name: user.name }),
  { logout },
)(SessionInfo);
