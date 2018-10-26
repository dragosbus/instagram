import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db, auth } from '../../firebase/firebase';
import { logOut } from '../../actionCreators/login';
import {getUserDataMiddleware} from '../../actionCreators/actions';
import './EditProfile.css';
import { bindActionCreators } from 'redux';

class EditProfile extends Component {
  state = {
    fullName: this.props.userData.fullName,
    username: this.props.userData.username,
    website: this.props.userData.website ? this.props.userData.website : '',
    bio: this.props.userData.bio ? this.props.userData.bio : '',
    email: this.props.userData.email,
    gender: this.props.userData.gender ? this.props.userData.gender : 'Male'
  };

  saveEdit = e => {
    e.preventDefault();
    let { fullName, username, website, bio, email, gender } = this.state;
    let newData = Object.assign({}, this.props.userData, {
      fullName,
      username,
      website,
      bio,
      email,
      gender
    });
    db.ref(`users/${this.props.userId}`)
      .set(newData)
      .then(() => {
        this.props.getData(this.props.userId);
        this.props.history(`/${this.props.userId}`);
      });
  };

  logOut = () => {
    auth.signOut().then(()=>{
      this.props.logOut();
      this.props.history('/');
    });
  };

  onChangeInput = (e, prop) => {
    if (e.target.value) {
      this.setState({ [prop]: e.target.value });
    }
  };

  render() {
    let userData = this.state;
    return (
      <div className="edit-profile-page">
        <div className="header">
          <img src={this.props.userData.profile_picture} alt="profile" />
          <p>{userData.username}</p>
          <button className="btn-logout" onClick={this.logOut}>
            Log Out
          </button>
        </div>
        <form onSubmit={this.saveEdit}>
          <div>
            <label htmlFor="fullname">Name</label>
            <input
              type="text"
              id="fullname"
              value={userData.fullName}
              onChange={e => this.onChangeInput(e, 'fullName')}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={userData.username}
              onChange={e => this.onChangeInput(e, 'username')}
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input type="text" id="website" value={userData.website} onChange={e => this.onChangeInput(e, 'website')} />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <input type="text" id="bio" value={userData.bio} onChange={e => this.onChangeInput(e, 'bio')} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={userData.email} onChange={e => this.onChangeInput(e, 'email')} />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select value={this.state.gender} onChange={e => this.onChangeInput(e, 'gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="not-specified">Not Specified</option>
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOut,
      getData: getUserDataMiddleware
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
