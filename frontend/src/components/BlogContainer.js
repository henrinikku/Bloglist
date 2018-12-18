/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Blog from './Blog';
import { notify } from '../reducers/notificationReducer';
import { likeBlog, removeBlog, commentOnBlog } from '../reducers/blogReducer';

const BlogContainer = ({
  history,
  user,
  blogs,
  id,
  notify,
  likeBlog,
  removeBlog,
  commentOnBlog,
}) => {
  if (!blogs || blogs.length === 0) {
    return <h2>loading...</h2>;
  }

  const blog = blogs.find(blog => blog.id === id);
  if (!blog) {
    return <h1>blog does not exists</h1>;
  }

  const handleLike = async () => {
    try {
      await likeBlog(blog);
      notify(`blog '${blog.title}' liked`, 'success', 5);
    } catch (exception) {
      notify(`could not like blog '${blog.title}'`, 'error', 5);
    }
  };

  const handleDelete = async () => {
    try {
      await removeBlog(blog);
      history.push('/');
      notify(`blog '${blog.title}' removed`, 'success', 5);
    } catch (exception) {
      history.push('/');
      notify(`blog '${blog.title}' might be already deleted`, 'error', 5);
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    commentOnBlog(blog.id, event.target.comment.value);
    event.target.comment.value = '';
  };

  return (
    <Blog
      blog={blog}
      handleLike={handleLike}
      handleDelete={handleDelete}
      handleComment={handleComment}
      canBeDeleted={!blog.user || blog.user.username === user.username}
    />
  );
};

const user = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

BlogContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  user: user.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user: user.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      _id: PropTypes.string,
      text: PropTypes.string.isRequired,
      date: PropTypes.string,
      user: PropTypes.object,
    })),
  })).isRequired,
  id: PropTypes.string.isRequired,
  notify: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  commentOnBlog: PropTypes.func.isRequired,
};

export default connect(
  ({ blogs, user }) => ({ blogs, user }),
  {
    notify,
    likeBlog,
    removeBlog,
    commentOnBlog,
  },
)(BlogContainer);
