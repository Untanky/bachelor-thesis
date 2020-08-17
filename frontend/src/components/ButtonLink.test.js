import React from 'react';
import ButtonLink from './ButtonLink';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <ButtonLink to="/home" text="Homepage" />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
