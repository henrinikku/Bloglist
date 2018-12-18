const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const app = express();

mongoose.connect(config.mongoUrl)
  .then(() => console.log('connected to database', config.mongoUrl))
  .catch(error => console.log(error));

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.getToken);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server running port ${config.port}`);
});

server.on('close', () => mongoose.connection.close());

module.exports = {
  app,
  server,
};
