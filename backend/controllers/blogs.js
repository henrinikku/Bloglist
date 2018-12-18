/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1 })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: { username: 1, name: 1 },
        },
      });

    res.json(blogs.map(Blog.format));
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: 'something went wrong' });
  }
});

blogsRouter.post('/', async (req, res) => {
  const {
    title,
    author,
    url,
    likes = 0,
  } = req.body;

  if (!(title && url)) {
    return res.status(400).json({ error: 'title or url missing' });
  }

  try {
    const { token } = req;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!(token && decodedToken.id)) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    await Blog.populate(savedBlog, {
      path: 'user',
      select: { username: 1, name: 1 },
    });

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    return res.json(Blog.format(savedBlog));
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: exception.message });
    }
    console.log(exception);
    return res.status(500).json({ error: 'something went wrong' });
  }
});

blogsRouter.post('/:id/comments', async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  if (!(text && id)) {
    return res.status(400).json({ error: 'text or blog missing' });
  }

  try {
    const { token } = req;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!(token && decodedToken.id)) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(id);
    const comment = new Comment({
      text,
      date: new Date(),
      user: user._id,
      blog: blog._id,
    });

    const savedComment = await comment.save();
    await Comment.populate(savedComment, {
      path: 'user',
      select: { username: 1, name: 1 },
    });

    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();

    return res.json(Comment.format(savedComment));
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: exception.message });
    }
    console.log(exception);
    return res.status(400).json({ error: 'malformatted id' });
  }
});

blogsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;
    const blog = { likes };

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    res.json(Blog.format(updatedBlog));
  } catch (exception) {
    console.log(exception);
    res.status(400).json({ error: 'malformatted id' });
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(204).end();
    }

    const { token } = req;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!(token && decodedToken.id)) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    if (!blog.user) {
      await blog.remove();
      return res.status(204).end();
    }

    if (blog.user.toString() !== decodedToken.id) {
      return res.status(401).json({ error: 'user does not have permission to delete given blog' });
    }

    const user = await User.findById(decodedToken.id);

    await blog.remove();

    user.blogs = user.blogs.filter(b => b._id.toString() !== req.params.id);
    await user.save();

    return res.status(204).end();
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: exception.message });
    }
    console.log(exception);
    return res.status(400).json({ error: 'malformatted id' });
  }
});

module.exports = blogsRouter;
