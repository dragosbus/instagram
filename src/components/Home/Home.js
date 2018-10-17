import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './Home.css';
import { CameraIcon, HomeIcon, SearchIcon, PlusIcon, HeartIcon, ProfileIcon, UserPlusIcon } from './Icons';

import Profile from '../Profile/Profile';
import AddPage from '../Add/Add';
import Search from '../Search/Search';
import Feed from '../Feed/Feed';
import Activity from '../Activity/Activity';
class Home extends Component {
  render() {
    //for security reasons, because userConnected from redux can be changed from react panel and get the home page
    return !this.props.userConnected.id ? (
      '404'
    ) : (
      <div className="home">
        <BrowserRouter>
          <div>
            <header>
              <NavLink to="/add" activeClassName="activeStyle">
                <CameraIcon />
              </NavLink>
              <NavLink to="/" className="logo">
                Instagram
              </NavLink>
              <NavLink to="/recomandations" activeClassName="activeStyle">
                <UserPlusIcon />
              </NavLink>
            </header>
            <main>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Feed userId={this.props.userConnected.id} />;
                  }}
                />
                <Route
                  path="/search"
                  render={() => {
                    return <Search />;
                  }}
                />
                <Route
                  path="/add"
                  render={() => {
                    return <AddPage userId={this.props.userConnected.id} />;
                  }}
                />
                <Route path="/activity" render={props => <Activity userId={this.props.userConnected.id} />} />
                <Route
                  path="/:userId"
                  render={props => {
                    return <Profile history={props.history} userId={props.match.params.userId} />;
                  }}
                />
              </Switch>
            </main>
            <footer>
              <NavLink exact to="/" activeClassName="activeStyle">
                <HomeIcon />
              </NavLink>
              <NavLink to="/search" activeClassName="activeStyle">
                <SearchIcon />
              </NavLink>
              <NavLink to="/add" activeClassName="activeStyle">
                <PlusIcon />
              </NavLink>
              <NavLink to="/activity" activeClassName="activeStyle">
                <HeartIcon />
              </NavLink>
              <NavLink to={`/${this.props.userConnected.id}`} activeClassName="activeStyle">
                <ProfileIcon />
              </NavLink>
            </footer>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userConnected: state.userConnected
});

export default connect(mapStateToProps)(Home);
