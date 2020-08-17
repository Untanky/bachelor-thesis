import React from 'react';
import SelectBox from './SelectBox';
import renderer from 'react-test-renderer';

const selectItems = [
  { text: 'One', value: 1 },
  { text: 'Two', value: 2 },
  { text: 'Three', value: 3 },
]

it('renders correctly', () => {
  const tree = renderer
    .create(<SelectBox selectItems={selectItems} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
