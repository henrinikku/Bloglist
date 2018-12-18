import loginService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/users';
import { notify } from './notificationReducer';
import { initializeBlogs } from './blogReducer';
import { initializeUsers } from './usersReducer';

export default (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const initializeSession = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if (!loggedUserJSON) return;
  const user = JSON.parse(loggedUserJSON);
  blogService.setToken(user.token);
  dispatch({
    type: 'LOGIN',
    data: user,
  });
  initializeBlogs()(dispatch);
  initializeUsers()(dispatch);
};

export const login = (username, password) => async (dispatch) => {
  const user = await loginService.login({ username, password });
  window.localStorage.setItem('loggedUser', JSON.stringify(user));
  blogService.setToken(user.token);
  dispatch({
    type: 'LOGIN',
    data: user,
  });
  initializeBlogs()(dispatch);
  initializeUsers()(dispatch);
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  window.localStorage.removeItem('loggedUser');
};

export const signup = (
  username,
  name,
  password,
  passwordAgain,
) => async (dispatch) => {
  if (!(username && name && password && passwordAgain)) {
    notify('All fields must be filled', 'error', 5)(dispatch);
    return;
  }
  if (password.length < 5) {
    notify('Password must be at least 5 characters long', 'error', 5)(dispatch);
    return;
  }
  if (password !== passwordAgain) {
    notify('Passwords must match', 'error', 5)(dispatch);
    return;
  }

  try {
    const newUser = await userService.create({ username, name, password });
    notify(
      `Welcome, ${newUser.name}! You can now log in`,
      'success',
      5,
    )(dispatch);
  } catch (exception) {
    notify('Username is already taken', 'error', 5)(dispatch);
  }
};
