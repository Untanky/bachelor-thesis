import React from 'react';
import EditPost from './EditPost';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<EditPost />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
