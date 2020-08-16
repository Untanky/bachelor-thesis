import React from 'react';

import './SelectBox.scss';

const SelectBox = ({ selectItems }) => {

  return (
    <select class="select-box">
      { selectItems.map((selectItem) => 
        (<option>{selectItem.text}</option>)
      ) }
    </select>
  )
};

export default SelectBox;
