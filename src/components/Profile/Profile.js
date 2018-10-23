import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getUserDataMiddleware,
  getPostsMiddleware,
  isFollowMiddleware,
  getCurrentPostIndex
} from '../../actionCreators/actions';
import './Profile.css';

import PostElementList from '../PostCard/PostCard';
import PostDetails from '../PostDetails/Post';
import FollowBtn from '../FollowBtn/Follow';

import { followHandlerDb, likePostHandler, createActivity } from '../../utils/firebaseHandlers';
import { db } from '../../firebase/firebase';

class Profile extends Component {
  state = {
    showDetailsPost: false,
    userLogged: false
  };

  followUser = async () => {
    return await this.props.follow;
  };

  onFollowChange = async event => {
    await db.ref(`users/${this.props.userId}/followers`).once(event);
  };

  likePost = () => {
    likePostHandler(this.props.currentPost.postId, this.props.currentPost.userId, this.props.userConnected.id).then(
      () => {
        createActivity(this.props.userConnected, this.props.userId, 'post_liked');
      }
    );
  };

  followHandler = () => {
    //first get the current state of following
    //if is true, should call the unfollow handler, otherwise should call the follow handler
    this.followUser()
      .then(res => {
        if (!res) {
          followHandlerDb(this.props.userConnected.id, this.props.userId, 'follow');
          this.onFollowChange('child_added').then(() => {
            this.props.getUserData(this.props.userId);
            createActivity(this.props.userConnected, this.props.userId, 'follow');
          });
        } else {
          followHandlerDb(this.props.userConnected.id, this.props.userId, 'unfollow');
          this.onFollowChange('child_removed').then(() => {
            this.props.getUserData(this.props.userId);
          });
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
    if (this.props.userId === this.props.userConnected.id) {
      this.onFollowChange('child_added');
      this.onFollowChange('child_removed');
    }
    //if the user is not logged in and the route is another user, after log in redirect to feed route
    if (!this.props.userConnected.id) {
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

  showDetails = index => {
    this.props.getCurrentPostIndex(index);
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ showDetailsPost: !this.state.showDetailsPost });
  };

  hideModal = () => {
    this.setState({ showDetailsPost: false });
  };

  convertToDateString = milis => {
    let date = new Date(milis);
    return date.toDateString();
  };

  render() {
    let { currentPost } = this.props;

    let btnProfile = this.state.userLogged ? (
      <Link to={`/${this.props.userId}/editprofile`} className="edit-profile">
        Edit Profile
      </Link>
    ) : (
      <FollowBtn follow={this.followHandler} isFollower={this.props.follow} />
    );
    let followers = this.props.userData.followers ? Object.keys(this.props.userData.followers).length : 0;

    let following = this.props.userData.following ? Object.keys(this.props.userData.following).length : 0;

    return (
      <div className="profile">
        <div className="profile-header">
          <img src="https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png" alt="profile user" />
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
                showDetails={() => {
                  this.showDetails(i);
                }}
                postId={post.postId}
                userId={post.userId}
                image={post.photo}
                comments={0}
              />
            );
          })}
        </div>
        <PostDetails
          data={this.props.userData}
          postImg={currentPost.photo}
          createdAt={currentPost.createdAt ? this.convertToDateString(currentPost.createdAt) : 0}
          showDetailsPost={this.state.showDetailsPost}
          toggleModal={this.toggleModal}
          userId={currentPost.userId}
          hideModal={this.hideModal}
          likePost={this.likePost}
          isLiked={currentPost.isLiked}
          postId={currentPost.postId}
          userConnected={this.props.userConnected.id}
          checkLikePost={this.props.checkLikePost}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userConnected: state.userConnected,
  userData: state.userData,
  userPosts: state.userPosts,
  follow: state.checkFollow,
  currentPost: state.userPosts[state.currentPostIndex] || {}
});

const mapDisptachToProps = dispatch =>
  bindActionCreators(
    {
      getUserData: getUserDataMiddleware,
      checkFollow: isFollowMiddleware,
      getPosts: getPostsMiddleware,
      getCurrentPostIndex: getCurrentPostIndex
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Profile);
