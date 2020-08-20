import React from 'react';
import PropTypes, { string } from 'prop-types';

import './SelectBox.scss';

const SelectBox = ({ selectItems, onChange }) => {
  return (
    <select 
      className="select-box"
      onChange={(evt) => onChange(evt.target.value)}
    >
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

SelectBox.propTypes = {
  selectItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      test: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SelectBox;
