import React from 'react';
import Blog from './Blog';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({ postId: 8080 }),
}));

it('renders correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <Blog />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
