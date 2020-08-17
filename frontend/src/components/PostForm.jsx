import React from 'react';
import PropTypes from 'prop-types';

import './PostForm.scss';
import TextInput from './TextInput';

import './PostForm.scss';

const PostForm = ({ initialState, onChange }) => {
  const onChangeField = (key) => (value) => {
    onChange(key, value);
  }

  return (
    <form className="post-form">
      <TextInput
        label="Title"
        onChange={onChangeField('title')}
        placeholder="Title"
        initialValue={initialState.title}
      />
      <TextInput 
        label="Description"
        onChange={onChangeField('description')}
        placeholder="Description"
        initialValue={initialState.description}
      />
    </form>
  )
};

PostForm.propTypes = {
  initialState: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

PostForm.defaultProps = {
  initialState: {
    title: '',
    description: '',
  },
};

export default PostForm;
