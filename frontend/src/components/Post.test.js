import React from 'react';
import Post from './Post';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

const post = {
  id: 1,
  title: 'Test title',
  description: 'This is the description for the test post. It contains vital data for the post and puts it into context.',
  numberOfComments: 6,
  url: 'post/1',
  deleteClicked: () => {},
};

it('renders correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <Post post={post} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
