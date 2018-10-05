import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserDataMiddleware, getPostsMiddleware, isFollowMiddleware } from '../../actionCreators/actions';
import './Profile.css';

import PostElementList from '../PostCard/PostCard';
import PostDetails from '../PostDetails/Post';
import FollowBtn from '../FollowBtn/Follow';

import { followHandlerDb } from '../../utils/firebaseHandlers';
import { db } from '../../firebase/firebase';
import { Object } from 'core-js';

class Profile extends Component {
  state = {
    currentPost: {},
    showDetailsPost: false,
    userLogged: false
  };

  followUser = async () => {
    return await this.props.follow;
  };

  onFollowChange = event => {
    db.ref(`users/${this.props.userId}/followers`)
      .once(event)
      .then(() => {
        console.log(event);
        this.props.getUserData(this.props.userId);
      });
  };

  followHandler = () => {
    //first get the current state of following
    //if is true, should call the unfollow handler, otherwise should call the follow handler
    this.followUser()
      .then(res => {
        if (!res) {
          followHandlerDb(this.props.userConnected.id, this.props.userId, 'follow');
          this.onFollowChange('child_added');
        } else {
          followHandlerDb(this.props.userConnected.id, this.props.userId, 'unfollow');
          this.onFollowChange('child_removed');
        }
      })
      .then(() => {
        //then change the state of follow
        this.props.checkFollow(this.props.userConnected.id, this.props.userId);
      });
  };

  componentDidMount() {
    //when component mount, get the data and check if it is the route with the profile of the user logged
    this.props.history.push(`/${this.props.userId}`);
    this.props.getUserData(this.props.userId);
    this.props.checkFollow(this.props.userConnected.id, this.props.userId);
    this.props.getPosts(this.props.userId);
    if (this.props.userId === this.props.userConnected.id) {
      this.setState({ userLogged: true });
    } else {
      this.setState({ userLogged: false });
    }
  }

  componentDidUpdate(prevProps) {
    /* 
    -when change route from the profile of an user to the own profile, we should check if are not the same for get the data of the own user.
    -I did this in componentdidupdate and not in componentdidmount, because when the route is changed, the old component is not unmounting, just the data, and we want the component updated with the new data
    */
   this.onFollowChange('child_removed');
   this.onFollowChange('child_added');
    //if the user is not logged in and the route is another user, after log in redirect to feed route
    if (!this.props.userData.id) {
      this.props.history.push(`/`);
    }
    if (prevProps.userId !== this.props.userId) {
      this.setState(
        prevState => ({
          userLogged: !prevState.userLogged
        }),
        () => {
          this.props.getUserData(this.props.userId);
          this.props.getPosts(this.props.userId);
        }
      );
    }
  }

  showDetails = post => {
    this.setState(
      () => ({
        currentPost: post
      }),
      this.toggleModal
    );
  };

  toggleModal = () => {
    this.setState({ showDetailsPost: !this.state.showDetailsPost });
  };

  hideModal = () => {
    this.setState({ showDetailsPost: false });
  };

  render() {
    let btnProfile = this.state.userLogged ? (
      <button className="edit-profile">Edit Profile</button>
    ) : (
      <FollowBtn follow={this.followHandler} isFollower={this.props.follow} />
    );
    let followers = this.props.userData.followers ? Object.keys(this.props.userData.followers).length : 0;

    let following = this.props.userData.following ? Object.keys(this.props.userData.following).length : 0;

    return (
      <div className="profile">
        <div className="profile-header">
          <img src="https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png" alt="profile user"/>
          <p>{this.props.userData.username}</p>
          {btnProfile}
          <h4>{this.props.userData.fullName}</h4>
        </div>
        <div className="profile-data">
          <p>{this.props.userPosts.length} posts</p>
          <p>{followers} followers</p>
          <p>{following} following</p>
        </div>
        <div className="profile-posts">
          {this.props.userPosts.map((post, i) => {
            return (
              <PostElementList
                key={`${this.props.userData.id}-post-${i}`}
                showDetails={() => this.showDetails(this.props.userPosts[i])}
                image={post.photo}
                likes={post.likes}
                comments={0}
              />
            );
          })}
        </div>
        <PostDetails
          data={this.props.userData}
          postImg={this.state.currentPost.photo}
          likes={this.state.currentPost.likes}
          createdAt={0}
          showDetailsPost={this.state.showDetailsPost}
          toggleModal={this.toggleModal}
          userId={this.state.currentPost.userId}
          hideModal={this.hideModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userConnected: state.userConnected,
  userData: state.userData,
  userPosts: state.userPosts,
  follow: state.checkFollow
});

const mapDisptachToProps = dispatch =>
  bindActionCreators(
    {
      getUserData: getUserDataMiddleware,
      checkFollow: isFollowMiddleware,
      getPosts: getPostsMiddleware
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Profile);
