const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .populate('blogs', {
        likes: 1, author: 1, title: 1, url: 1,
      });

    res.json(users.map(User.format));
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: 'something went wrong' });
  }
});

usersRouter.post('/', async (req, res) => {
  const {
    username,
    name,
    password,
    adult = true,
  } = req.body;

  if (!(username && password)) {
    return res.status(400).json({ error: 'must provide username and password' });
  }
  if (password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters long' });
  }

  try {
    const userExists = await User.find({ username });
    if (userExists.length > 0) {
      return res.status(400).json({ error: 'username must be unique' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      hashedPassword,
      username,
      name,
      adult,
    });
    const savedUser = await user.save();

    return res.json(User.format(savedUser));
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = usersRouter;
