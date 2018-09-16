import React, { Component } from 'react';
import './Profile.css';

import PostCard from '../PostCard/PostCard';

class Profile extends Component {
  state = {
    posts: []
  }
  makePosts = () => {
    for(let id in this.props.reduxProps.posts) {
      this.setState(prevState=>({
        posts: prevState.posts.concat(this.props.reduxProps.posts[id])
      }));
    }
  }

  componentDidMount() {
    this.makePosts();
  }
  render() {
    console.log(this.props)
    return (
      <div className="profile">
        <div className="profile-header">
          <img src="https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png" />
          <p>{this.props.reduxProps.userData.username}</p>
          <button>Edit Profile</button>
          <h4>{this.props.reduxProps.userData.fullName}</h4>
        </div>
        <div className="profile-data">
          <p>{this.state.posts.length} posts</p>
          <p>0 followers</p>
          <p>0 following</p>
        </div>
        <div className="profile-posts">
          {
            this.state.posts.map(post=> {
              return <PostCard image={post.photo}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default Profile;
