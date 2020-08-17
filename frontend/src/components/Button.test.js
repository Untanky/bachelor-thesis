import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';

it('renders cancel button correctly', () => {
  const tree = renderer
    .create(
      <Button type="cancel" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders normal button correctly', () => {
  const tree = renderer
    .create(
      <Button />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders delete button correctly', () => {
  const tree = renderer
    .create(
      <Button type="delete" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
