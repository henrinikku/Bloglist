import React from 'react';
import { Route } from 'react-router-dom';
import shortId from 'shortid';
import UserList from './components/UserList';
import BlogList from './components/BlogList';
import UserPageContainer from './components/UserPageContainer';
import BlogContainer from './components/BlogContainer';

export const staticRoutes = [
  {
    path: '/',
    title: 'blogs',
    render: () => <BlogList />,
  },
  {
    path: '/users',
    title: 'users',
    render: () => <UserList />,
  },
];

export const dynamicRoutes = [
  {
    path: '/users/:id',
    render: ({ match }) => <UserPageContainer id={match.params.id} />,
  },
  {
    path: '/blogs/:id',
    render: ({ match, history }) => (
      <BlogContainer id={match.params.id} history={history} />
    ),
  },
];

const objectToRoute = ({ path, render }) => (
  <Route
    key={`Route-${shortId.generate()}`}
    exact
    path={path}
    render={render}
  />
);

export default () => (
  <div>
    {staticRoutes.map(objectToRoute)}
    {dynamicRoutes.map(objectToRoute)}
  </div>
);
