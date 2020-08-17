import React from 'react';

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

export default PostList;
