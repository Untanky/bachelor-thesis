import React from 'react';
import TextInput from './TextInput';
import renderer from 'react-test-renderer';

global.Math.random = () => 0.5;

const onChange = () => {};

it('renders correctly with initial value', () => {
  const tree = renderer
    .create(
      <TextInput
        label="Test label"
        placeholder="Placeholder"
        initialValue="Initial value"
        onChange={onChange}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders correctly without initial value', () => {
  const tree = renderer
    .create(
      <TextInput
        label="Test label"
        placeholder="Placeholder"
        onChange={onChange}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
