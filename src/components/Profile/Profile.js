import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="profile-header">
          <img src="https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png" />
          <p>{this.props.reduxProps.userData.username}</p>
          <button>Edit Profile</button>
          <h4>{this.props.reduxProps.userData.fullName}</h4>
        </div>
        <div className="profile-data">
          <p>0 posts</p>
          <p>0 followers</p>
          <p>0 following</p>
        </div>
        <div className="profile-posts">
        </div>
      </div>
    );
  }
}

export default Profile;
