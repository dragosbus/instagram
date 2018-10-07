import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostsForFeed } from '../../actionCreators/actions';
import { getDataFromFirebase } from '../../utils/firebaseHandlers';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';

import './Feed.css';

class Feed extends Component {
  state = {
    posts: []
  };
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

  componentDidMount() {
    if (!this.props.feedPosts.posts.length) {
      this.props
        .getPostsForFeed(this.props.userId)(this.props.feedPosts.index)
        .then(() => {
          console.log(this.props.feedPosts);
        });
    }
  }

  loadMorePosts = () => {
    this.props
      .getPostsForFeed(this.props.userId)(this.props.feedPosts.index)
      .then(() => {
        console.log(this.props.feedPosts);
      });
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  calcTimePostCreated = (createdAt) => {
    let timeMili = Date.now() - createdAt;
    let seconds = Math.floor(timeMili / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    
    if(seconds < 60) {
      return `${seconds} seconds ago`;
    } else if(seconds >= 60 && minutes < 60) {
      return `${minutes} minutes ago`;
    } else if(minutes >=60 && hours < 24) {
      return `${hours} hours ago`;
    }
  }

  render() {
    let rendered = this.props.feedPosts.posts ? (
      <ul>
        {this.props.feedPosts.posts.map((post, i) => {
          return (
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
                  <button>
                    <MdFavoriteBorder />
                  </button>
                  <button>
                    <MdChatBubbleOutline />
                  </button>
                </div>
                <p>{post.likes} Likes</p>
                <p>
                  <span>{post.username}:</span>
                  {post.description}
                </p>
                <p>{this.calcTimePostCreated(post.createdAt)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      ''
    );
    return (
      <div className="feed">
        {rendered}
        <button onClick={this.loadMorePosts}>Load</button>
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
