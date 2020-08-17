import React from 'react';

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
        defaultValue={initialValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
