import React from 'react';

import Header from './components/Header';

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
