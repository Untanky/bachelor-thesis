import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Button.scss';

const Button = ({ className, type, onClick, children }) => {
  return (
    <button
      className={classnames('button', type, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: '',
  type: 'default',
};

export default Button;
