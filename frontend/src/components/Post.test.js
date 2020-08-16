import React from 'react';
import Post from './Post';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Post />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
