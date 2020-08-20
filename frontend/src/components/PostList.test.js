import React from 'react';
import PostList from './PostList';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

const postList = [
  {
    id: 1,
    title: 'Test title',
    description: 'This is the description for the test post. It contains vital data for the post and puts it into context.',
    numberOfComments: 6,
    url: 'post/1'
  },
  {
    id: 2,
    title: 'My newest post',
    description: 'This is the description for the test post. It contains vital data for the post and puts it into context.',
    numberOfComments: 0,
    url: 'post/2'
  },
  {
    id: 3,
    title: 'Post with some content',
    description: 'This is the description for the test post. It contains vital data for the post and puts it into context.',
    numberOfComments: 200,
    url: 'post/3'
  },
];

it('renders correctly', () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <PostList posts={postList} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
