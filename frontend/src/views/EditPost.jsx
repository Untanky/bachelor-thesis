import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import PostForm from '../components/PostForm';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';

import './EditPost.scss';

const EditPost = () => {
  const initialState = {
    title: 'Test title',
    description: 'long description, bla bla blubb'
  }

  const port = useSelector(state => state.languageSelector.port);
  const history = useHistory();

  const [formData, setFormData] = useState(initialState)
  const { postId } = useParams();

  Axios.get(`http://localhost:${port}/api/blog/post/${postId}`)
    .then((res) => setFormData(res.data))
    .catch((reason) => console.log(reason));

  const confirmClicked = () => {
    Axios.put(`http://localhost:${port}/api/blog/post/${postId}`, formData)
      .then(() => history.push('/'))
      .catch((reason) => console.log(reason));
  }


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
        <ButtonLink
          to="/"
          type="cancel"
        >
          Cancel
        </ButtonLink>
        <Button
          className="edit-button"
          onClick={confirmClicked}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
};

export default EditPost;
