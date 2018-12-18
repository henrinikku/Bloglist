import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { addBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';

class BlogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      title: '',
      url: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { author, title, url } = this.state;
    this.resetFields();
    try {
      const blog = { author, title, url };
      await this.props.addBlog(blog);
      this.props.notify(`new blog ${title} added`, 'success', 5);
    } catch (exception) {
      this.props.notify(`couldn't add blog ${title}`, 'error', 5);
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  resetFields = () => {
    this.setState({ author: '', title: '', url: '' });
  }

  render() {
    const { author, title, url } = this.state;
    return (
      <div>
        <h2>create new</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="title"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <Form.Input
            label="author"
            type="text"
            name="author"
            value={author}
            onChange={this.handleChange}
          />
          <Form.Input
            label="url"
            type="text"
            name="url"
            value={url}
            onChange={this.handleChange}
          />
          <Button primary type="submit">create</Button>
        </Form>
      </div>
    );
  }
}

BlogForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  addBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
};

export default connect(
  ({ user }) => ({ user }),
  { addBlog, notify },
)(BlogForm);
