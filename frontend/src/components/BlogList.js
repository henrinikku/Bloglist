import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const BlogList = ({ blogs }) => {
  if (blogs.length === 0) {
    return (
      <div>
        <h2>blogs</h2>
        <h2>loading blogs...</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Table>
        <Table.Body>
          {blogs.map(blog => (
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(
  ({ blogs }) => ({
    blogs: blogs.sort((b1, b2) => b2.likes - b1.likes),
  }),
)(BlogList);
