import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

// Views
import Toolbar from './views/Toolbar';
import Blog from './views/Blog';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Toolbar />
        <Switch>
          <Route path="/post/create">
            <CreatePost />
          </Route>
          <Route path="/post/edit/:postId">
            <EditPost />
          </Route>
          <Route path="/">
            <Blog />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
