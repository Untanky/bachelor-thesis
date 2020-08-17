import React from 'react';

import './SelectBox.scss';

const SelectBox = ({ selectItems }) => {

  return (
    <select className="select-box">
      { selectItems.map((selectItem) => 
          <option 
            key={Math.random()}
            value={selectItem.value}
          >
            {selectItem.text}
          </option>
      ) }
    </select>
  )
};

export default SelectBox;
