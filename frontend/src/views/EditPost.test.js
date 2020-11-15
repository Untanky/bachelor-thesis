import React from 'react';
import EditPost from './EditPost';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history'

global.Math.random = () => 0.5;

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ postId: 3 }),
  useHistory: jest.fn().mockReturnValue(() => {}),
}));

jest.mock('../components/ButtonLink.jsx', () => ({
  __esModule: true,
  default: () => { return <></>; },
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({ postId: 8080 }),
}));

const { Router } = jest.requireActual('react-router');
const history = createMemoryHistory();

// console.log(StaticRouter);

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router history={history}>
        <EditPost />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
