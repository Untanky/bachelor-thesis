import React from 'react';
import CreatePost from './CreatePost';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

global.Math.random = () => 0.5;

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({ postId: 8080 }),
}));

it('renders correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <CreatePost />
      </StaticRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
