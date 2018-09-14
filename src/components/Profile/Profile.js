import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';

class Profile extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="profile">
        <div className="profile-header">
          <img src="https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png" />
          <p>{this.props.userData.username}</p>
          <button>Edit Profile</button>
          <h4>{this.props.userData.fullName}</h4>
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

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps)(Profile);
