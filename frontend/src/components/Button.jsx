import React from 'react';
import classnames from 'classnames';

import './Button.scss';

const Button = ({ type, onClick, children }) => {
  return (
    <button
      className={classnames('button', { cancel: type === 'cancel' })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
