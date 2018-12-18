/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const { app, server } = require('../index');
const Blog = require('../models/blog');
const User = require('../models/user');
const {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
} = require('./test_helper');

const api = supertest(app);

describe('Blogs API', async () => {
  beforeEach(async () => {
    await Blog.remove({});
    const blogs = initialBlogs.map(b => new Blog(b));
    const promiseArray = blogs.map(b => b.save());
    await Promise.all(promiseArray);
  });

  describe('GET /api/blogs', async () => {
    test('all blogs are returned as json', async () => {
      const blogsInDatabase = await blogsInDb();
      const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.length).toBe(blogsInDatabase.length);

      const responseTitles = response.body.map(b => b.title);
      blogsInDatabase.forEach(b => expect(responseTitles).toContain(b.title));
    });
  });

  describe('POST /api/blogs', async () => {
    test('a new blog with valid data can be added', async () => {
      const newBlog = {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
      };

      const blogsBefore = await blogsInDb();

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter.length).toBe(blogsBefore.length + 1);
      expect(blogsAfter.map(b => b.title)).toContain(newBlog.title);
    });

    test('blog without field "likes" is added with 0 likes', async () => {
      const newBlog = {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        __v: 0,
      };

      const blogsBefore = await blogsInDb();

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(200);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter.length).toBe(blogsBefore.length + 1);

      const blogsAfterWithTitleAndLikes = blogsAfter
        .map(({ title, likes }) => ({ title, likes }));
      expect(blogsAfterWithTitleAndLikes).toContainEqual({ title: newBlog.title, likes: 0 });
    });

    test('blog without title or url is not added', async () => {
      const newBlog = {
        _id: '4a422ba71b54a676234d17fb',
        author: 'Testi',
        __v: 0,
      };

      const blogsBefore = await blogsInDb();

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(400);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter.length).toBe(blogsBefore.length);
    });
  });

  describe('DELETE /api/blogs/:id', async () => {
    test('existing blog can be deleted', async () => {
      const blogToBeDeleted = new Blog({
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Tämä tullaan poistamaan',
        author: 'Joku Tyyppi',
        url: 'http://www.testi.fi',
        likes: 12,
        __v: 0,
      });
      await blogToBeDeleted.save();

      const blogsBefore = await blogsInDb();

      await api.delete(`/api/blogs/${blogToBeDeleted._id}`)
        .expect(204);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter.length).toBe(blogsBefore.length - 1);

      const titles = blogsAfter.map(b => b.title);
      expect(titles).not.toContain(blogToBeDeleted.title);
    });

    test('400 is returned with invalid id', async () => {
      const invalidId = '234234äää';
      await api.delete(`/api/blogs/${invalidId}`)
        .expect(400);
    });
  });

  describe('PUT /api/blogs/:id', async () => {
    test('likes of an existing blog can be modified', async () => {
      const blogToBeModified = new Blog({
        _id: '5a422b3a2b54a676234d17f9',
        title: 'Tämän likejen määrää tullaan muokkaamaan',
        author: 'Joku Tyyppi',
        url: 'http://www.testi.fi',
        likes: 10,
        __v: 0,
      });
      await blogToBeModified.save();

      const blogsBefore = await blogsInDb();

      await api.put(`/api/blogs/${blogToBeModified._id}`)
        .send({ id: blogToBeModified._id, likes: 11 })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter.length).toBe(blogsBefore.length);

      const titlesAndLikes = blogsAfter
        .map(({ title, likes }) => ({ title, likes }));

      expect(titlesAndLikes).toContainEqual({
        title: blogToBeModified.title,
        likes: 11,
      });
    });

    test('400 is returned with invalid id', async () => {
      const invalidId = '234234äää';
      await api.put(`/api/blogs/${invalidId}`)
        .expect(400);
    });
  });
});

describe('Users API', async () => {
  beforeEach(async () => {
    await User.remove({});
    const users = initialUsers.map(u => new User(u));
    await Promise.all(users.map(u => u.save()));
  });

  describe('GET /api/users', async () => {
    test('all users are returned as json', async () => {
      const usersInDatabase = await usersInDb();
      const response = await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.length).toBe(usersInDatabase.length);

      const usernames = response.body.map(u => u.username);
      usersInDatabase.forEach(u => expect(usernames).toContain(u.username));
    });
  });

  describe('POST /api/users', async () => {
    test('a new user can be created', async () => {
      const newUser = {
        username: 'uusi',
        name: 'uusi nimi',
        password: 'uusisalis',
        adult: false,
      };

      const usersBefore = await usersInDb();

      await api.post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const usersAfter = await usersInDb();
      expect(usersAfter.length).toBe(usersBefore.length + 1);

      const usernames = usersAfter.map(u => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test('default value for adult is true', async () => {
      const newUser = {
        username: 'uusi',
        name: 'uusi nimi',
        password: 'uusisalis',
      };

      const usersBefore = await usersInDb();

      await api.post('/api/users')
        .send(newUser)
        .expect(200);

      const usersAfter = await usersInDb();
      expect(usersAfter.length).toBe(usersBefore.length + 1);

      const formattedUsers = usersAfter
        .map(({ username, adult }) => ({ username, adult }));
      const formattedNewUser = { username: newUser.username, adult: true };
      expect(formattedUsers).toContainEqual(formattedNewUser);
    });

    test('user with too short password is not added', async () => {
      const newUser = {
        username: 'uusi',
        name: 'uusi nimi',
        password: 'uu',
      };

      const usersBefore = await usersInDb();

      await api.post('/api/users')
        .send(newUser)
        .expect(400);

      const usersAfter = await usersInDb();
      expect(usersAfter.length).toBe(usersBefore.length);
    });

    test('user with reserved username is not added', async () => {
      const usersBefore = await usersInDb();

      await api.post('/api/users')
        .send(initialUsers[0])
        .expect(400);

      const usersAfter = await usersInDb();
      expect(usersAfter.length).toBe(usersBefore.length);
    });
  });
});

afterAll(() => server.close());
