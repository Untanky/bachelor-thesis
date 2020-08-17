import React, { useState } from 'react';

import PostForm from '../components/PostForm';
import Button from '../components/Button';

import './CreatePost.scss';

const CreatePost = () => {
  const [formData, setFormData] = useState({});

  const onChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div className="create-post">
      <h1 className="title">
        Create post
      </h1>
      <PostForm 
        onChange={onChange}
      />
      <div className="button-container">
        <Button
          type="cancel"
        >Cancel</Button>
        <Button>Create</Button>
      </div>
    </div>
  )
};

export default CreatePost;
