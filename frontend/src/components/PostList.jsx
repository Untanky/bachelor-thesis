import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

import './PostList.scss';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      { posts.map((post) => (
        <Post 
          key={Math.random()}
          post={post}
        />
      )) }
    </div>
  )
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
};

export default PostList;
