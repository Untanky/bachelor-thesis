import React from 'react';
import EditPost from './EditPost';
import renderer from 'react-test-renderer';

global.Math.random = () => 0.5;

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ postId: 3 }),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({ postId: 8080 }),
}));w

it('renders correctly', () => {
  const tree = renderer
    .create(<EditPost />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
