import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPage from './UserPage';

const UserPageContainer = ({ id, users }) => (
  <UserPage
    user={users.find(user => user.id === id)}
  />
);

UserPageContainer.propTypes = {
  id: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

export default connect(
  ({ users }) => ({ users }),
)(UserPageContainer);
