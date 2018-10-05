import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { FaCamera, FaUserPlus } from 'react-icons/fa';
import './Home.css';
import { MdFavoriteBorder, MdHome, MdSearch, MdPersonOutline, MdAddCircleOutline } from 'react-icons/md';

import Profile from '../Profile/Profile';
import AddPage from '../Add/Add';
import Search from '../Search/Search';
import Feed from '../Feed/Feed';

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
              <svg className="icon icon-camera" id="Layer_1" enable-background="new 0 0 48 48" version="1.1" viewBox="0 0 48 48"><g><path d="M43,46H5c-1.7,0-3-1.3-3-3V21c0-1.7,1.3-3,3-3h8.7c0.4,0,0.7-0.2,0.9-0.5l0.9-1.9c0.4-1,1.5-1.7,2.7-1.7h11.5   c1.2,0,2.3,0.7,2.7,1.7l0.9,1.7c0.2,0.3,0.5,0.5,0.9,0.5H43c1.7,0,3,1.3,3,3v22C46,44.7,44.7,46,43,46z M5,20c-0.6,0-1,0.4-1,1v22   c0,0.6,0.4,1,1,1h38c0.6,0,1-0.4,1-1V21c0-0.6-0.4-1-1-1h-8.8c-1.1,0-2.1-0.6-2.7-1.6l-0.9-1.8c-0.2-0.4-0.5-0.5-0.9-0.5H18.2   c-0.4,0-0.7,0.2-0.9,0.5l-0.9,1.9c-0.4,1-1.5,1.7-2.7,1.7H5z"/></g><g><path d="M24,42c-5.5,0-10-4.5-10-10s4.5-10,10-10c5.5,0,10,4.5,10,10S29.5,42,24,42z M24,24c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8   S28.4,24,24,24z"/></g></svg>
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
              <NavLink to="/" activeClassName="activeStyle">
              <svg className='icon icon-home' enable-background="new 0 0 48 48" height="48px" version="1.1" viewBox="0 0 48 48" width="48px"><g id="Expanded"><g><g><path d="M42,48H28V35h-8v13H6V27c0-0.552,0.447-1,1-1s1,0.448,1,1v19h10V33h12v13h10V28c0-0.552,0.447-1,1-1s1,0.448,1,1V48z"/></g><g><path d="M47,27c-0.249,0-0.497-0.092-0.691-0.277L24,5.384L1.691,26.723c-0.399,0.381-1.032,0.368-1.414-0.031     c-0.382-0.399-0.367-1.032,0.031-1.414L24,2.616l23.691,22.661c0.398,0.382,0.413,1.015,0.031,1.414     C47.526,26.896,47.264,27,47,27z"/></g><g><path d="M39,15c-0.553,0-1-0.448-1-1V8h-6c-0.553,0-1-0.448-1-1s0.447-1,1-1h8v8C40,14.552,39.553,15,39,15z"/></g></g></g></svg>
              </NavLink>
              <NavLink to="/search" activeClassName="activeStyle">
              <svg className="icon icon-search" enable-background="new 0 0 100 100" id="Layer_1" version="1.1" viewBox="0 0 100 100"><path clipRule="evenodd" d="M64.5,44.6c0-11.6-9.4-20.9-20.9-20.9c-11.6,0-20.9,9.4-20.9,20.9  c0,11.6,9.4,20.9,20.9,20.9C55.1,65.6,64.5,56.2,64.5,44.6z M80,79.3l-1.8,1.8l-19-19c-4.2,3.7-9.6,6-15.7,6  c-13,0-23.5-10.5-23.5-23.5c0-13,10.5-23.5,23.5-23.5c13,0,23.5,10.5,23.5,23.5c0,6-2.3,11.5-6,15.7L80,79.3z"/></svg>
              </NavLink>
              <NavLink to="/add" activeClassName="activeStyle">
              <svg enable-background="new 0 0 77.945 77.945" height="77.945px" id="Layer_1" version="1.1" viewBox="0 0 77.945 77.945" width="77.945px" className="icon icon-plus"><g><g><g><g><g><path d="M0,38.973C0.001,17.448,17.448,0,38.972,0l0,0c21.523,0,38.973,17.448,38.973,38.974l0,0       c0,21.522-17.447,38.971-38.973,38.973l0,0C17.448,77.943,0.001,60.496,0,38.973L0,38.973z M12.131,12.131       C5.262,19.002,1.013,28.488,1.013,38.973l0,0c0,10.483,4.249,19.971,11.117,26.842l0,0       c6.871,6.869,16.356,11.117,26.842,11.117l0,0c10.484,0,19.971-4.248,26.842-11.117l0,0       c6.871-6.871,11.117-16.357,11.117-26.842l0,0c0-10.483-4.246-19.972-11.117-26.843l0,0C58.941,5.26,49.457,1.014,38.972,1.014       l0,0C28.487,1.014,19.002,5.26,12.131,12.131L12.131,12.131z" /></g></g></g><g><g><polygon points="38.231,61.238 38.231,16.706 39.431,16.706 39.431,61.238 38.231,61.238     "/></g><g><polygon points="16.847,38.444 16.847,37.244 61.096,37.244 61.096,38.444 16.847,38.444     "/></g></g></g></g></svg>
              </NavLink>
              <NavLink to="/activity" activeClassName="activeStyle">
              <svg className='icon icon-heart' enable-background="new 0 0 48 48" height="48px" version="1.1" viewBox="0 0 48 48" width="48px"><g id="Expanded"><g><path d="M24,47.001c-0.173,0-0.346-0.045-0.501-0.135c-0.239-0.138-5.913-3.447-11.678-8.778C3.977,30.835,0,23.668,0,16.787    c0-9.275,6.279-13.5,12.113-13.5c4.499,0,9.53,2.572,11.887,8.229c2.357-5.657,7.389-8.229,11.887-8.229    C41.721,3.287,48,7.512,48,16.787c0,6.881-3.977,14.048-11.821,21.301c-5.765,5.331-11.439,8.641-11.678,8.778    C24.346,46.956,24.173,47.001,24,47.001z M12.113,5.287C7.242,5.287,2,8.886,2,16.787C2,30.65,20.674,42.783,24,44.833    c3.323-2.051,22-14.193,22-28.046c0-7.901-5.242-11.5-10.113-11.5c-4.473,0-9.58,3.062-10.905,9.903C24.891,15.66,24.479,16,24,16    s-0.891-0.34-0.982-0.81C21.693,8.35,16.586,5.287,12.113,5.287z"/></g></g></svg>
              </NavLink>
              <NavLink to={`/${this.props.userConnected.id}`} activeClassName="activeStyle">
              <svg id="Layer_1" enable-background="new 0 0 48 48" version="1.1" viewBox="0 0 48 48" className="icon icon-profile"><g><path d="M24,26c6.6,0,12-5.4,12-12S30.6,2,24,2c-6.6,0-12,5.4-12,12S17.4,26,24,26z M24,4c5.5,0,10,4.5,10,10s-4.5,10-10,10   c-5.5,0-10-4.5-10-10S18.5,4,24,4z"/><path d="M33,28H15C7.8,28,2,33.8,2,41v5h2v-5c0-6.1,4.9-11,11-11h18c6.1,0,11,4.9,11,11v5h2v-5C46,33.8,40.2,28,33,28z"/></g></svg>
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
