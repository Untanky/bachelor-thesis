import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import PostList from '../components/PostList';

import './Blog.scss';

const Blog = () => {
  const [postList, setPostList] = useState([]);
  const port = useSelector(state => state.languageSelector.port);
  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:${port}/api/blog/post`)
      .then((res) => setPostList(res.data))
      .catch((reason) => console.log(reason));
  }, [port]);

  const posts = postList.map((post) => ({
    ...post,
    deleteClicked: () => {
      Axios.delete(`http://localhost:${port}/api/blog/post/${post.id}`)
        .then(() => window.location.reload())
        .catch((reason) => console.log(reason));
    }
  }));

  console.log(posts[0] && posts[0].deleteClicked);
  
  return (
    <div className="blog">
      <PostList posts={posts} />
    </div>
  )
};

export default Blog;
