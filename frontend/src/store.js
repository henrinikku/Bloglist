import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import filterReducer from './reducers/filterReducer';


const reducer = combineReducers({
  notification: notificationReducer,
  users: usersReducer,
  user: userReducer,
  blogs: blogReducer,
  filter: filterReducer,
});

export default createStore(
  reducer,
  applyMiddleware(thunk),
);
