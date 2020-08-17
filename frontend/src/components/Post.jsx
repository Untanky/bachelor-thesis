import React from 'react';

import ButtonLink from './ButtonLink';

import './Post.scss';

const Post = ( { post } ) => {
  return (
    <div className="post">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-description">{post.description}</p>
      <ButtonLink
        className="edit-link"
        to={`/post/edit/${post.id}`}
        text="Edit post"
      />
    </div>
  )
};

export default Post;
