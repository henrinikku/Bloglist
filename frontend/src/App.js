import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import Routes from './Routes';
import LoginOrRegister from './components/LoginOrRegister';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Navbar from './components/Navbar';
import { notify } from './reducers/notificationReducer';
import { initializeSession } from './reducers/userReducer';

class App extends React.Component {
  componentDidMount = async () => {
    this.props.initializeSession();
    const { user } = this.props;
    if (user) {
      this.props.notify(`welcome back, ${user.name}`, 'success', 5);
    }
  }

  render() {
    return this.props.user === null ? (
      <Container>
        <h2>blog app</h2>
        <Notification />
        <LoginOrRegister />
      </Container>
    ) : (
      <Container>
        <Router>
          <div>
            <Navbar />
            <Notification />
            <h2>blog app</h2>
            <Togglable hideButtonLabel="cancel" displayButtonLabel="add blog">
              <BlogForm />
            </Togglable>
            <Divider section />
            <Routes />
          </div>
        </Router>
      </Container>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  {
    notify,
    initializeSession,
  },
)(App);
