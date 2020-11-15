import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import ButtonLink from './ButtonLink';

import './Post.scss';

const Post = ( { post } ) => {

  return (
    <div className="post">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-description">{post.description}</p>
      <div className="button-container">
        <ButtonLink
          className="edit-link"
          to={`/post/edit/${post.id}`}
        >
          Edit Post
        </ButtonLink>
        <Button
          className="delete-link"
          type="delete"
          onClick={post.deleteClicked}
        >
          Delete post
        </Button>
      </div>
    </div>
  )
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    deleteClicked: PropTypes.func,
  }).isRequired,
};

export default Post;
