import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">{this.props.user.isSignedIn ? <Home /> : <LoginPage />}</div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
