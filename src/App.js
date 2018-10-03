import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename='/instagram/build'>
        <div className="app">{this.props.userConnected.isSignedIn ? <Home /> : <LoginPage />}</div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  userConnected: state.userConnected
});

export default connect(mapStateToProps)(App);
