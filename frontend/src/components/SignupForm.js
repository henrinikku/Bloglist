/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { signup } from '../reducers/userReducer';

const SignupForm = ({ signup }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { target } = event;
    const username = target.username.value;
    const name = target.name.value;
    const password = target.password.value;
    const passwordAgain = target.passwordAgain.value;
    target.password.value = '';
    target.passwordAgain.value = '';
    signup(username, name, password, passwordAgain);
  };

  return (
    <div>
      <h2>Sign up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="12">
          <Form.Input
            width="10"
            icon="user"
            iconPosition="left"
            type="text"
            name="username"
            label="username"
          />
          <Form.Input
            width="12"
            icon="male"
            iconPosition="left"
            type="text"
            name="name"
            label="name"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            icon="lock"
            iconPosition="left"
            type="password"
            name="password"
            label="password"
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            type="password"
            name="passwordAgain"
            label="Password again"
          />
        </Form.Group>
        <Button primary type="submit">Sign up</Button>
      </Form>
    </div>
  );
};

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default connect(
  null,
  { signup },
)(SignupForm);
