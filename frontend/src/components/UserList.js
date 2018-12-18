/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import User from './User';

const UserList = ({ users }) => (
  <div>
    <h2>users</h2>
    {users.length === 0 ? (
      <h2>loading users...</h2>
    ) : (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>blogs added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => <User key={user.id} user={user} />)}
        </Table.Body>
      </Table>
    )}
  </div>
);

UserList.propTypes = {
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
)(UserList);
