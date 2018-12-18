import React from 'react';
import PropTypes from 'prop-types';

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="info">
      {blog.title} {blog.author}
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
);

SimpleBlog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SimpleBlog;
