import React from 'react';

import LanguageSelectBox from '../containers/LanguageSelectBox';
import ButtonLink from '../components/ButtonLink';

import './Toolbar.scss';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <span className="right-align">
        <ButtonLink to="/post/create">
          Create post
        </ButtonLink>
        <LanguageSelectBox />
      </span>
    </div>
  )
};

export default Toolbar;
