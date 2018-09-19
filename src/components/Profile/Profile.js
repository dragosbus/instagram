import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserDataMiddleware, getPostsMiddleware, followMiddleware } from '../../actionCreators/actions';
import './Profile.css';

import PostCard from '../PostCard/PostCard';
import PostDetails from '../PostDetails/Post';
import FollowBtn from '../FollowBtn/Follow';

class Profile extends Component {
  state = {
    currentPost: {},
    showDetailsPost: false,
    userLogged: false
  };

  toggleDetailsPost = () => {
    this.setState({ showDetailsPost: !this.state.showDetailsPost });
  };

  showDetails = post => {
    this.setState({ currentPost: post });
    this.toggleDetailsPost();
  };

  componentDidMount() {
    this.props.getPosts(this.props.userId);
    this.props.getUserData(this.props.userId);

    if (this.props.userId === this.props.user.uid) {
      this.setState({ userLogged: true });
    } else {
      this.setState({ userLogged: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      this.props.getUserData(this.props.userId);
      this.props.getPosts(this.props.userData.id);
    } //when the route profile si changed from random user to user logged, the data sin ot changing
  }

  render() {
    let btnProfile = this.state.userLogged ? (
      <button className="edit-profile">Edit Profile</button>
    ) : (
      <FollowBtn
        follow={this.props.follow}
        userDataId={this.props.userData.id}
        userId={this.props.user.uid}
        followers={this.props.followers}
      />
    );
      console.log(this.props);
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userData: state.userData,
  userPosts: state.userPosts,
  followers: state.followers
});

const mapDisptachToProps = dispatch =>
  bindActionCreators(
    {
      getUserData: getUserDataMiddleware,
      getPosts: getPostsMiddleware,
      follow: followMiddleware
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Profile);
