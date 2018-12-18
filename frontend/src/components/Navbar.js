import React from 'react';
import shortId from 'shortid';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { staticRoutes } from '../Routes';
import SessionInfo from './SessionInfo';

export default () => (
  <Menu color="blue" inverted>
    {staticRoutes.map(({ path, title }) => (
      <Menu.Item
        exact
        key={`Link-${shortId.generate()}`}
        as={NavLink}
        to={path}
        content={title}
      />
    ))}
    <Menu.Menu position="right">
      <Menu.Item>
        <SessionInfo />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
