import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

const TextInput = ({ label, placeholder, initialValue, onChange }) => {
  const id = Math.random();

  return (
    <div className="text-input">
      <label
        className="label"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className="input-field"
        type="text"
        onChange={(evt) => onChange(evt.target.value)}
        value={initialValue}
        placeholder={placeholder}
      />
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  initialValue: '',
};

export default TextInput;
