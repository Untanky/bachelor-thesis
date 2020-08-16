import React from 'react';
import CreatePost from './CreatePost';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<CreatePost />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
