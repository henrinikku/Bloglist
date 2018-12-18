/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

commentSchema.statics.format = ({
  _id,
  date,
  text,
  user,
  blog,
}) => ({
  id: _id,
  text,
  date,
  user,
  blog,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
