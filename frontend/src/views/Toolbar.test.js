import React from 'react';
import Toolbar from './Toolbar';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

jest.mock('../containers/LanguageSelectBox.jsx', () => ({
  __esModule: true,
  default: () => { return <div>false</div>; },
}));

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
