import React from 'react';
import PostForm from './PostForm';
import renderer from 'react-test-renderer';

global.Math.random = () => 0.5;

it('renders correctly with initial state', () => {
  const initialState = {
    title: 'Test title',
    description: 'Description might be longer than the title and contain more data',
  };

  const tree = renderer
    .create(<PostForm initialState={initialState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without initial state', () => {
  const tree = renderer
    .create(<PostForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
