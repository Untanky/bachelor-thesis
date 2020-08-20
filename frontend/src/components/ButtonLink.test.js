import React from 'react';
import ButtonLink from './ButtonLink';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

it('renders default correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <ButtonLink 
          to="/home" 
          text="Homepage"
        >
          Home
        </ButtonLink>
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders cancel button linku correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <ButtonLink 
          to="/home"
          text="Homepage"
          type="cancel"
        >
          Cancel
        </ButtonLink>
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders delete button link correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <ButtonLink
          to="/home"
          text="Homepage"
          type="delete"
        >
          Home
        </ButtonLink>
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
