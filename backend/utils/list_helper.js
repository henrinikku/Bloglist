const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;

  return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const reducer = (max, curr) => (
    max.likes > curr.likes ? max : curr
  );

  return blogs.reduce(reducer, blogs[0] || null);
};

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length < 1) {
    return null;
  }

  const blogsBy = (author) => {
    const reducer = (sum, blog) => sum + (blog.author === author ? 1 : 0);
    return blogs.reduce(reducer, 0);
  };

  const mostBlogsReducer = (best, curr) => (
    best.blogs > curr.blogs ? best : curr
  );

  return blogs.map(({ author }) => ({ author, blogs: blogsBy(author) }))
    .reduce(mostBlogsReducer);
};

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length < 1) {
    return null;
  }

  const likesBy = (author) => {
    const reducer = (sum, blog) => (
      sum + (blog.author === author ? blog.likes : 0)
    );
    return blogs.reduce(reducer, 0);
  };

  const mostLikesReducer = (best, curr) => (
    best.likes > curr.likes ? best : curr
  );

  return blogs.map(({ author }) => ({ author, likes: likesBy(author) }))
    .reduce(mostLikesReducer);
};

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
