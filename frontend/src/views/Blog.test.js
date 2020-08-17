import React from 'react';
import Blog from './Blog';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

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
