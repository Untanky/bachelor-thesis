import React from 'react';
import { Link } from 'react-router-dom';

import './ButtonLink.scss';

const Button = ({ to, text }) => {
  return (
    <Link className="button-link" to={to}>
      {text}
    </Link>
  )
};

export default Button;
