import React from 'react';
import { useParams } from 'react-router-dom'

const EditPost = () => {
  const { postId } = useParams();

  return (
    <h1>Edit Post { postId }</h1>
  )
};

export default EditPost;
