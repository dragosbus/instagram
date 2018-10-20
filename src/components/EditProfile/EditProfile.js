import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase/firebase';
import './EditProfile.css';

class EditProfile extends Component {
  state = {
    fullName: this.props.userData.fullName,
    username: this.props.userData.username,
    website: this.props.website ? this.props.website : '',
    bio: this.props.bio ? this.props.bio : '',
    email: this.props.email
  };
  saveEdit = e => {
    e.preventDefault();
  };

  render() {
    let userData = this.state;
    return (
      <div className="edit-profile-page">
        <div className="header">
          <img src={this.props.userData.profile_picture} alt="profile picture" />
          <p>{userData.username}</p>
        </div>
        <form onSubmit={this.saveEdit}>
          <div>
            <label htmlFor="fullname">Name</label>
            <input type="text" id="fullname" value={userData.fullName} />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={userData.username} />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input type="text" id="website" value={userData.website} />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <input type="text" id="bio" value={userData.bio} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={userData.email} />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select value={userData.gender ? userData.gender : 'male'}>
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

export default connect(mapStateToProps)(EditProfile);
