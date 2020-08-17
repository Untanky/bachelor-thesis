import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostForm from '../components/PostForm';
import Button from '../components/Button';

import './EditPost.scss';

const EditPost = () => {
  const initialState = {
    title: 'Test title',
    description: 'long description, bla bla blubb'
  }

  const [formData, setFormData] = useState(initialState)
  const { postId } = useParams();

  const onChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div className="edit-post">
      <h1 className="title">
        Edit Post { postId }
      </h1>
      <PostForm
        initialState={formData}
        onChange={onChange}
      />
      <div className="button-container">
        <Button
          type="cancel"
        >
          Cancel
        </Button>
        <Button>
          Confirm
        </Button>
      </div>
    </div>
  )
};

export default EditPost;
