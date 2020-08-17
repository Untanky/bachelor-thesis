import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import PostList from '../components/PostList';

import './Blog.scss';

const Blog = () => {
  const [postList, setPostList] = useState([]);
  const port = useSelector(state => state.languageSelector.port);

  Axios.get(`http:localhost:${port}/api/blog/post`)
    .then((res) => setPostList(res.data))
    .catch((reason) => console.log(reason));

  return (
    <div className="blog">
      <PostList posts={postList} />
    </div>
  )
};

export default Blog;
