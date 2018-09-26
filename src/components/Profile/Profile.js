import React, { Component } from 'react';
import { db } from '../../firebase/firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserDataMiddleware, isFollowMiddleware } from '../../actionCreators/actions';
import './Profile.css';

import PostCard from '../PostCard/PostCard';
import PostDetails from '../PostDetails/Post';
import FollowBtn from '../FollowBtn/Follow';

import {followHandlerDb} from '../../utils/firebaseHandlers';


class Profile extends Component {
  state = {
    currentPost: {},
    showDetailsPost: false,
    userLogged: false
  };

  followUser = async () => {
    return await this.props.follow;
  };

  followHandler = () => {
    //first get the current state of following
    //if is true, should call the unfollow handler, otherwise should call the follow handler
    this.followUser()
      .then(res => {
        if (!res) {
          followHandlerDb(this.props.userConnected.id, this.props.userId, 'follow');
        } else {
          followHandlerDb(this.props.userConnected.id, this.props.userId, 'unfollow');
        }
      })
      .then(() => {
        //then change the state of follow
        this.props.checkFollow(this.props.userConnected.id, this.props.userId);
      });
  };

  componentDidMount() {
    //when component mount, get the data and check if it is the route with the profile of the user logged

    this.props.getUserData(this.props.userId);
    this.props.checkFollow(this.props.userConnected.id, this.props.userId);

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
    if (prevProps.userId !== this.props.userId) {
      this.setState(
        prevState => ({
          userLogged: !prevState.userLogged
        }),
        () => {
          this.props.getUserData(this.props.userId);
        }
      );
    }
  }

  render() {
    let btnProfile = this.state.userLogged ? (
      <button className="edit-profile">Edit Profile</button>
    ) : (
      <FollowBtn follow={this.followHandler} isFollower={this.props.follow} />
    );

    return (
      <div className="profile">
        <div className="profile-header">
          <img src="https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png" />
          <p>{this.props.userData.username}</p>
          {btnProfile}
          <h4>{this.props.userData.fullName}</h4>
        </div>
        <div className="profile-data">
          <p>{this.props.userPosts.length} posts</p>
          <p>0 followers</p>
          <p>0 following</p>
        </div>
        <div className="profile-posts">
          {this.props.userPosts.map((post, i) => {
            return (
              <PostCard
                key={i}
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
          toggleModal={this.toggleDetailsPost}
          userId={this.state.currentPost.userId}
          hideModal={this.toggleDetailsPost}
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
      checkFollow: isFollowMiddleware
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Profile);
