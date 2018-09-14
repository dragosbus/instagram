import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { FaHome, FaSearch, FaPlus, FaHeart, FaUser, FaCamera, FaUserPlus } from 'react-icons/fa';
import './Home.css';

import Profile from '../Profile/Profile';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    let activeStyle = { fontSize: '30px' };
    return (
      <div className="home">
        <BrowserRouter>
          <div>
            <header>
              <NavLink to="/add" activeStyle={activeStyle}>
                <FaCamera />
              </NavLink>
              <NavLink to="/" className="logo">
                Instagram
              </NavLink>
              <NavLink to="/recomandations" activeStyle={activeStyle}>
                <FaUserPlus />
              </NavLink>
            </header>
            <main>
              <Route exact path="/" render={props => "hello"} />
              <Route exact path="/profile" component={Profile} />
            </main>
            <footer>
              <NavLink to="/" activeStyle={activeStyle}>
                <FaHome />
              </NavLink>
              <NavLink to="/search" activeStyle={activeStyle}>
                <FaSearch />
              </NavLink>
              <NavLink to="/add" activeStyle={activeStyle}>
                <FaPlus />
              </NavLink>
              <NavLink to="/activity" activeStyle={activeStyle}>
                <FaHeart />
              </NavLink>
              <NavLink to="/profile" activeStyle={activeStyle}>
                <FaUser />
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

export default connect(mapStateToProps)(Home);
