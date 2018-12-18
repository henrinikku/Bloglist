import blogService from '../services/blogs';
import { addBlogForUser, removeBlogFromUser } from './usersReducer';
import { notify } from './notificationReducer';

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data];
    case 'COMMENT_BLOG': {
      const old = state.filter(b => b.id !== action.data.id);
      const commented = state.find(b => b.id === action.data.id);
      return [...old, {
        ...commented,
        comments: commented.comments.concat(action.data.comment),
      }];
    }
    case 'LIKE_BLOG': {
      const old = state.filter(b => b.id !== action.data.id);
      const liked = state.find(b => b.id === action.data.id);
      return [...old, { ...liked, likes: liked.likes + 1 }];
    }
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id);
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const commentOnBlog = (id, text) => async (dispatch) => {
  try {
    const comment = await blogService.createComment(id, { text });
    dispatch({
      type: 'COMMENT_BLOG',
      data: { id, comment },
    });
    notify('New comment added', 'success', 5)(dispatch);
  } catch (exception) {
    notify('Could not add comment', 'error', 5)(dispatch);
  }
};

export const likeBlog = blog => async (dispatch) => {
  const { id, likes } = blog;
  const newBlog = { ...blog, likes: likes + 1 };
  await blogService.update(id, newBlog);
  dispatch({
    type: 'LIKE_BLOG',
    data: { id },
  });
};

export const addBlog = blog => async (dispatch) => {
  const newBlog = await blogService.create(blog);
  addBlogForUser({
    ...newBlog,
    user: { ...newBlog.user, id: newBlog.user._id },
  })(dispatch);
  dispatch({
    type: 'ADD_BLOG',
    data: newBlog,
  });
};

export const removeBlog = blog => async (dispatch) => {
  await blogService.deleteBlog(blog.id);
  removeBlogFromUser({
    ...blog,
    user: { ...blog.user, id: blog.user._id },
  })(dispatch);
  dispatch({
    type: 'REMOVE_BLOG',
    data: { id: blog.id },
  });
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};
