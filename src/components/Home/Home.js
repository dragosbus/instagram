import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { FaCamera, FaUserPlus } from 'react-icons/fa';
import './Home.css';
import { MdFavoriteBorder, MdHome, MdSearch, MdPersonOutline, MdAddCircleOutline } from 'react-icons/md';

import Profile from '../Profile/Profile';
import AddPage from '../Add/Add';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <BrowserRouter>
          <div>
            <header>
              <NavLink to="/add" activeClassName="activeStyle">
                <FaCamera />
              </NavLink>
              <NavLink to="/" className="logo">
                Instagram
              </NavLink>
              <NavLink to="/recomandations" activeClassName="activeStyle">
                <FaUserPlus />
              </NavLink>
            </header>
            <main>
              <Switch>
                <Route exact path="/" render={props => 'hello'} />
                <Route
                  path="/profile"
                  render={(props) => {
                    return <Profile path={props.match.path} />;
                  }}
                />
                <Route
                  exact
                  path="/add"
                  render={props => {
                    return <AddPage userId={this.props.user.uid} />;
                  }}
                />
                <Route
                  exact
                  path="/user/:userId"
                  render={(props) => {
                    return <Profile path={props.match.path} userId={props.match.params.userId} />;
                  }}
                />
              </Switch>
            </main>
            <footer>
              <NavLink to="/" activeClassName="activeStyle">
                <MdHome />
              </NavLink>
              <NavLink to="/search" activeClassName="activeStyle">
                <MdSearch />
              </NavLink>
              <NavLink to="/add" activeClassName="activeStyle">
                <MdAddCircleOutline />
              </NavLink>
              <NavLink to="/activity" activeClassName="activeStyle">
                <MdFavoriteBorder />
              </NavLink>
              <NavLink to="/profile" activeClassName="activeStyle">
                <MdPersonOutline />
              </NavLink>
            </footer>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(Home);
