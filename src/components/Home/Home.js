import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {} from '../../actionCreators/actions';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { FaHome, FaSearch, FaPlus, FaHeart, FaUser, FaCamera, FaUserPlus } from 'react-icons/fa';
import './Home.css';

import Profile from '../Profile/Profile';
import AddPage from '../Add/Add';

class Home extends Component {
  
  render() {
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
              <Switch>
                <Route exact path="/" render={props => 'hello'} />
                <Route exact path="/profile" render={()=>{
                  return <Profile reduxProps={this.props}/>
                }} />
                <Route exact path="/add" render={props=>{
                  return <AddPage userId={this.props.user.uid}/>
                }} />
              </Switch>
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
  user: state.user,
  posts: state.userPosts,
  userData: state.userData
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
      
//     },
//     dispatch
//   );


export default connect(mapStateToProps, null)(Home);
