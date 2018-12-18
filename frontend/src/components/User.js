import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const User = ({ user }) => (
  <Table.Row>
    <Table.Cell>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </Table.Cell>
    <Table.Cell>
      {user.blogs ? user.blogs.length : 0}
    </Table.Cell>
  </Table.Row>
);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default User;
