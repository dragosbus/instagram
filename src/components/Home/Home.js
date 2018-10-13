import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './Home.css';
import { CameraIcon, HomeIcon, SearchIcon, PlusIcon, HeartIcon, ProfileIcon, UserPlusIcon } from './Icons';

import Profile from '../Profile/Profile';
import AddPage from '../Add/Add';
import Search from '../Search/Search';
import Feed from '../Feed/Feed';

class Home extends Component {
  state = {
    left: 0
  };

  changeActiveBar = e => {
    e.stopPropagation();
    const links = document.querySelectorAll('footer a');
    let index = 0;
    if(e.target.tagName === 'A') {
      index = [...links].indexOf(e.target);
    } else {
      index = [...links].indexOf(e.target.parentNode)
    }
    this.setState({left: `${index * 20}%`})
  };

  render() {
    //for security reasons, because userConnected from redux can be changed from react panel and get the home page
    return this.props.userConnected.id ? (
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
                <Route
                  path="/:userId"
                  render={props => {
                    return <Profile history={props.history} userId={props.match.params.userId} />;
                  }}
                />
              </Switch>
            </main>
            <footer>
              <NavLink exact to="/" activeClassName="activeStyle" onClick={this.changeActiveBar}>
                <HomeIcon />
              </NavLink>
              <NavLink to="/search" activeClassName="activeStyle" onClick={this.changeActiveBar}>
                <SearchIcon />
              </NavLink>
              <NavLink to="/add" activeClassName="activeStyle" onClick={this.changeActiveBar}>
                <PlusIcon />
              </NavLink>
              <NavLink to="/activity" activeClassName="activeStyle" onClick={this.changeActiveBar}>
                <HeartIcon />
              </NavLink>
              <NavLink
                to={`/${this.props.userConnected.id}`}
                activeClassName="activeStyle"
                onClick={this.changeActiveBar}
              >
                <ProfileIcon />
              </NavLink>
              <div style={{ left: this.state.left }} className="active-bar" />
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
