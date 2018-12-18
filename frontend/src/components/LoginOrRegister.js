import React from 'react';
import { Segment, Grid, Divider } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default () => (
  <Segment vertical>
    <Grid columns={2} relaxed="very">
      <Grid.Column>
        <LoginForm />
      </Grid.Column>
      <Grid.Column>
        <SignupForm />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
);
