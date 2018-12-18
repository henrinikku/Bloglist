/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { login } from '../reducers/userReducer';
import { notify } from '../reducers/notificationReducer';

const LoginForm = ({ login, notify }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      await login(username, password);
      notify('Welcome', 'success', 5);
    } catch (exception) {
      notify('incorrect credentials!', 'error', 5);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          icon="user"
          iconPosition="left"
          type="text"
          name="username"
          label="username"
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          type="password"
          name="password"
          label="password"
        />
        <Button primary type="submit">Login</Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
};

export default connect(
  null,
  { login, notify },
)(LoginForm);
