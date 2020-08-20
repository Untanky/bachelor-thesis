import React from 'react';
import Toolbar from './Toolbar';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <Toolbar />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
