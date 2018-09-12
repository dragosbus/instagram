import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginPage from './components/LoginPage/LoginPage';

class App extends Component {
  render() {
    console.log(this.props.user);
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
