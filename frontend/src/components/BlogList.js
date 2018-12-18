import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import Filter from './Filter';

const BlogList = ({ blogs, filter }) => {
  if (blogs.length === 0 && filter === '') {
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
      <Filter />
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

const mapStateToProps = ({ blogs, filter }) => {
  const blogsToDisplay = blogs
    .filter(b => b.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((b1, b2) => b2.likes - b1.likes);
  return { blogs: blogsToDisplay, filter };
};

export default connect(
  mapStateToProps,
)(BlogList);
