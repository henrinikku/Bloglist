import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

describe('<App />', () => {
  let app;

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />);
    });

    it('only renders login form', () => {
      app.update();

      const blogComponents = app.find(Blog);
      const loginFormComponents = app.find(LoginForm);

      expect(blogComponents.length).toEqual(0);
      expect(loginFormComponents.length).toEqual(1);
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'testi',
        token: '234234234234',
        name: 'Testi Ukkeli',
      };
      localStorage.setItem('loggedUser', JSON.stringify(user));
      app = mount(<App />);
    });

    it('renders all blogs it gets from the backend', () => {
      app.update();

      const blogComponents = app.find(Blog);

      expect(blogComponents.length).toEqual(blogService.blogs.length);
    });
  });
});
