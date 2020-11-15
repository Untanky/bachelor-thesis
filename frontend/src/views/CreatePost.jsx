import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import PostForm from '../components/PostForm';
import ButtonLink from '../components/ButtonLink';
import Button from '../components/Button';

import './CreatePost.scss';

const CreatePost = () => {
  const port = useSelector(state => state.languageSelector.port);
  const history = useHistory();
  const [formData, setFormData] = useState({});

  const changeForm = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const createClicked = () => {
    Axios.post(`http://localhost:${port}/api/blog/post`, formData)
      .then(() => history.push('/'))
      .catch((reason) => console.log(reason));
  }

  return (
    <div className="create-post">
      <h1 className="title">
        Create post
      </h1>
      <PostForm 
        initialState={formData}
        onChange={changeForm}
      />
      <div className="button-container">
        <ButtonLink
          type="cancel"
          to="/"
        >Cancel</ButtonLink>
        <Button 
          className="create-button"
          onClick={createClicked}
        >
          Create
        </Button>
      </div>
    </div>
  )
};

export default CreatePost;
