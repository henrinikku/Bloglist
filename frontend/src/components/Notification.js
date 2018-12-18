/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { unsetNotification } from '../reducers/notificationReducer';

const Notification = ({ notification, unsetNotification }) => {
  if (!notification) return null;
  const { message, type } = notification;

  return (
    <Message
      onDismiss={unsetNotification}
      size="large"
      error={type === 'error'}
      success={type === 'success'}
      content={message}
    />
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  unsetNotification: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  notification: null,
};

export default connect(
  ({ notification }) => ({ notification }),
  { unsetNotification },
)(Notification);
