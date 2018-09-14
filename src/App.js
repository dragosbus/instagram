import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    console.log(this.props.user.isSignedIn);
    return (
      <div className="App">
        <BrowserRouter>
          <div className="app">
            <Route
              exact path="/"
              render={props => {
                return this.props.user.isSignedIn ? <Home /> : <LoginPage />;
              }}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
