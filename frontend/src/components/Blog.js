import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  List,
  Divider,
} from 'semantic-ui-react';

const Blog = ({
  blog,
  handleLike,
  handleDelete,
  handleComment,
  canBeDeleted,
}) => {
  const {
    author,
    likes,
    title,
    url,
    user: { name = '' } = {},
    comments,
  } = blog;

  return (
    <div>
      <h2>{title} by {author}</h2>
      <div>
        <div><a href={url}>{url}</a></div>
        <div>
          {likes} likes &nbsp;
          <Button compact type="small" positive onClick={handleLike}>
            like
          </Button>
        </div>
        <div>added by {name}</div>
        {canBeDeleted ? (
          <Button compact type="small" negative onClick={handleDelete}>
            delete
          </Button>
        ) : null
        }
      </div>
      <Divider section />
      <div>
        <h3>Comments</h3>
        <Form onSubmit={handleComment} autoComplete="off">
          <Form.Input name="comment" />
          <Button compact type="small">Add comment</Button>
        </Form>
        <List divided relaxed>
          {!comments ? null : comments.map(comment => (
            <List.Item key={comment.id || comment._id}>
              <List.Icon name="comment" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>
                  {comment.user.name} {((
                    new Date().getTime() - new Date(comment.date).getTime()
                  ) / (1000 * 60 * 60 * 24)).toFixed(0)} days ago
                </List.Header>
                <List.Description>{comment.text}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({ name: PropTypes.string }),
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleComment: PropTypes.func.isRequired,
  canBeDeleted: PropTypes.bool.isRequired,
};

export default Blog;
