import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserPage = ({ user }) => {
  if (!user) {
    return <h2>loading...</h2>;
  }

  if (user.blogs.length === 0) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>No blogs yet :(</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <Table>
        <Table.Body>
          {user.blogs.map(blog => (
            <Table.Row key={blog._id || blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog._id || blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

UserPage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })),
  }),
};

UserPage.defaultProps = {
  user: null,
};

export default UserPage;
