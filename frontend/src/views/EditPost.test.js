import React from 'react';
import EditPost from './EditPost';
import renderer from 'react-test-renderer';

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ postId: 3 }),
}));

it('renders correctly', () => {
  const tree = renderer
    .create(<EditPost />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
