import React from 'react';
import './Post.css';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getPostsMiddleware, getUserProfileClikedMiddleware} from '../../actionCreators/actions';

class PostDetails extends React.Component {
  getUserPosts = () => {
    this.props.getPosts(this.props.userId);
    this.props.getDataUserClicked(this.props.userId);
  };
  render() {
    let data = this.props.data;
    return (
      <div className="overlay" style={{ display: this.props.showDetailsPost ? 'block' : 'none' }}>
        <button className="close-post-modal" onClick={this.props.toggleModal}>X</button>
        <div className="post-details">
          <div className="header">
            <Link to={`/user/${this.props.userId}`} onClick={this.getUserPosts}>
              <img src={data.profile_picture} />
              <p>{data.username}</p>
            </Link>
          </div>
          <div className="post-image">
            <img src={this.props.postImg} />
          </div>
          <div className="detail">
            {/* <ul>
              {data.comments.map(comment=>)}
            </ul> */}
            <div className="actions">
              <button>
                <MdFavoriteBorder />
              </button>
              <button>
                <MdChatBubbleOutline />
              </button>
            </div>
            <div className="info-post">
              <h4>{this.props.likes} likes</h4>
              <p>{this.props.createdAt}</p>
            </div>
            <form className="add-comment">
              <textarea placeholder="Add a comment..." />
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getPosts: getPostsMiddleware,
  getDataUserClicked: getUserProfileClikedMiddleware
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(PostDetails);
