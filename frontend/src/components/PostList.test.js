import React from 'react';
import PostList from './PostList';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<PostList />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
