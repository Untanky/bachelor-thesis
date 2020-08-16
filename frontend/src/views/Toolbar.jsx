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
    <div class="toolbar">
      <span class="right-align">
        <ButtonLink 
          to="/post/create"
          text="Create post"
        />
        <SelectBox selectItems={LanguageOptions} />
      </span>
    </div>
  )
};

export default Toolbar;
