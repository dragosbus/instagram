import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostsForFeed } from '../../actionCreators/actions';
import { Link } from 'react-router-dom';
import { Comment, HeartIcon } from '../Home/Icons';

import './Feed.css';

class Feed extends Component {
  // handleScroll = e => {
  //   let id = Math.floor(e.target.scrollingElement.scrollTop / 487);
  //   console.log(e.target.scrollingElement.scrollTop);
  //   this.setState(
  //     prevState => ({
  //       posts: prevState.posts.concat(post[id])
  //     }),
  //     () => console.log(post)
  //   );
  // };

  state = {
    loadPost: this.props.getPostsForFeed(this.props.userId)
  };

  componentDidMount() {
    this.state.loadPost(this.props.feedPosts.index);
  }

  loadPost = () => {
    this.state.loadPost(this.props.feedPosts.index);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  likePost = (e) => {
    // likePostHandler(this.state.currentPost.postId, this.state.currentPost.userId, this.props.userConnected.id).then(
    //   () => {
    //     console.log('liked');
    //     this.props.checkLikePost(
    //       this.state.currentPost.postId,
    //       this.state.currentPost.userId,
    //       this.props.userConnected.id
    //     );
    //   }
    // );
    console.log('liked', e.target);
  };

  render() {
    let postList = this.props.feedPosts.posts ? (
      <ul>
        {this.props.feedPosts.posts.map((post, i) => {
          return post !== null ? (
            <li className="element-post" key={`${post.username}-${post.userId}-${i}`}>
              <div className="header-post">
                <Link to={`/${post.userId}`}>
                  <img src={post.profile_photo} />
                  <h4>{post.username}</h4>
                </Link>
              </div>
              <div className="main-post">
                <img src={post.photo} />
                <div className="actions">
                  <button onClick={this.likePost} style={{ background: post.isLiked ? 'red' : 'none' }}>
                    <HeartIcon />
                  </button>
                  <button>
                    <Comment />
                  </button>
                </div>
                <p>{post.likes} Likes</p>
                <p>
                  <span>{post.username}:</span>
                  {post.description}
                </p>
                <p>
                  Created:
                  {this.calcTimePostCreated(post.createdAt)}
                </p>
              </div>
            </li>
          ) : (
            ''
          );
        })}
      </ul>
    ) : (
      ''
    );
    return (
      <div className="feed">
        {postList}
        <button className="btn-load" onClick={this.loadPost}>
          Load
        </button>
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
