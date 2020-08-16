import React from 'react';
import SelectBox from './SelectBox';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<SelectBox />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
