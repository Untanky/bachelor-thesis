import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import './ButtonLink.scss';

const ButtonLink = ({ className, type, to, children }) => {
  return (
    <Link className={classnames('button', type, className)} to={to}>
      {children}
    </Link>
  )
};

ButtonLink.propTypes = {
  className: PropTypes.string, 
  type: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

ButtonLink.defaultProps = {
  className: '',
  type: '',
};

export default ButtonLink;
