import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getFollowingPostsMiddleware} from '../../actionCreators/actions';
import { firebase } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';

import './Feed.css';

class Feed extends Component {

  // componentDidMount() {
  //   this.props.getPosts(this.props.userId);
  // }

  render() {
    return (
      <div className="feed">
        {/* <ul>
          {followingPosts.map(post => {
            return (
              <li key={`${post.description}-${post.userId}`}>
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
                  <p>Created at time ago</p>
                </div>
              </li>
            );
          })}
        </ul> */}
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   followingPosts: state.followingPosts
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       getPosts: getFollowingPostsMiddleware
//     },
//     dispatch
//   );

export default connect(
  null,
  null
)(Feed);
