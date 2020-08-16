import React from 'react';
import Blog from './Blog';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Blog />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
