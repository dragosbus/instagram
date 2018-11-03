import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostsForFeed } from '../../actionCreators/actions';
import Posts from './PostsList';

import { likePostHandler, createActivity } from '../../utils/firebaseHandlers';

import './Feed.css';

class Feed extends Component {
  state = {
    loadPost: this.props.getPostsForFeed(this.props.userId)
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.state.loadPost(this.props.feedPosts.index);
  }

  loadPost = () => {
    this.state.loadPost(this.props.feedPosts.index);
  };

  onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadPost();
      console.log('loaded')
    }
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  calcTimePostCreated = createdAt => {
    let timeMili = Date.now() - createdAt;
    let seconds = Math.floor(timeMili / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds >= 60 && minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (minutes >= 60 && hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  likePost = index => {
    let currentPost = this.props.feedPosts.posts[index];
    likePostHandler(currentPost.postId, currentPost.userId, this.props.userId).then(() => {
      console.log('liked', currentPost, this.props.userId);
      createActivity(this.props.userConnected, currentPost.userId, 'post_liked');
    });
  };

  render() {
    return (
      <div className="feed">
        <Posts
          feedPosts={this.props.feedPosts.posts}
          likePost={this.likePost}
          calcTimePostCreated={this.calcTimePostCreated}
          userConnected={this.props.userId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedPosts: state.feedPosts
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPostsForFeed: getPostsForFeed
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
