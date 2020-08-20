import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';

const onClick = () => {};

it('renders cancel button correctly', () => {
  const tree = renderer
    .create(
      <Button 
        type="cancel" 
        onClick={onClick}
      >
        Cancel
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders normal button correctly', () => {
  const tree = renderer
    .create(
      <Button onClick={onClick}>
        Confirm
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders delete button correctly', () => {
  const tree = renderer
    .create(
      <Button 
        type="delete" 
        onClick={onClick}
      >
        Delete
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
