import userService from '../services/users';

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.data];
    case 'INIT_USERS':
      return action.data;
    case 'ADD_BLOG_FOR_USER': {
      const { id } = action.data.blog.user;
      const oldState = state.filter(u => u.id !== id);
      const user = state.find(u => u.id === id);
      return [...oldState, {
        ...user,
        blogs: user.blogs.concat(action.data.blog),
      }];
    }
    case 'REMOVE_BLOG_FROM_USER':
      const { id } = action.data.blog.user;
      const oldState = state.filter(u => u.id !== id);
      const user = state.find(u => u.id === id);
      return [...oldState, {
        ...user,
        blogs: user.blogs.filter(b => b._id !== action.data.blog.id),
      }];
    default:
      return state;
  }
};

export const addBlogForUser = blog => (dispatch) => {
  dispatch({
    type: 'ADD_BLOG_FOR_USER',
    data: { blog },
  });
};

export const removeBlogFromUser = blog => (dispatch) => {
  dispatch({
    type: 'REMOVE_BLOG_FROM_USER',
    data: { blog },
  });
};

export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch({
    type: 'INIT_USERS',
    data: users,
  });
};
