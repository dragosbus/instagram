import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="app">
            <Route to="/" component={LoginPage}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
