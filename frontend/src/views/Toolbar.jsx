import React from 'react';

import SelectBox from '../components/SelectBox';
import ButtonLink from '../components/ButtonLink';

import './Toolbar.scss';

const LanguageOptions = [
  { key: 'JAVA_SPRING', text: 'Java - Spring' },
  { key: 'JAVA_JAXRS', text: 'Java - JaxRS' },
  { key: 'CSHARP_ASPNET', text: 'C# - ASP.NET' },
]

const Toolbar = () => {
  return (
    <div className="toolbar">
      <span className="right-align">
        <ButtonLink to="/post/create">
          Create post
        </ButtonLink>
        <SelectBox selectItems={LanguageOptions} />
      </span>
    </div>
  )
};

export default Toolbar;
