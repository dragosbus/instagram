import React from 'react';
import './Post.css';
import { Comment, HeartIcon } from '../Home/Icons';
import { Link } from 'react-router-dom';
import { getDataFromFirebase, totalLikes } from '../../utils/firebaseHandlers';

class PostDetails extends React.Component {
  state = {
    isLiked: false,
    totalLikes: 0
  };

  componentWillUpdate(props) {
    if (props.showDetailsPost) {
      this.checkLike(this.props.postId, this.props.userId, this.props.userConnected)
        .then(async isLiked => {
          let totalLikesN = await totalLikes(this.props.postId, this.props.userId);
          return { totalLikesN, isLiked };
        })
        .then(res => {
          this.setState({ totalLikes: res.totalLikesN, isLiked: res.isLiked });
        });
    }
  }

  checkLike = async (postId, owner, userId) => {
    //check if is liked handler
    let post = await getDataFromFirebase(`posts/${owner}/${postId}`);
    const props = post
      ? Object.values(post).filter(prop => typeof prop === 'object' && prop !== null && !Array.isArray(prop))
      : [];

    let res = props.map(user => {
      return userId === user.userId;
    });
    return res.some(v => v);
  };

  render() {
    let data = this.props.data;

    return (
      <div className="overlay" style={{ display: this.props.showDetailsPost ? 'block' : 'none' }}>
        <button className="close-post-modal" onClick={this.props.toggleModal}>
          X
        </button>
        <div className="post-details">
          <div className="header">
            <Link
              to={`/${this.props.userId}`}
              onClick={() => {
                this.props.hideModal();
              }}
            >
              <img src={data.profile_picture} alt="profile user" />
              <p>{data.username}</p>
            </Link>
          </div>
          <div className="post-image">
            <img src={this.props.postImg} alt="post detail" />
          </div>
          <div className="detail">
            {/* <ul>
              {data.comments.map(comment=>)}
            </ul> */}
            <div className="actions">
              <button
                onClick={() => {
                  this.props.likePost();
                }}
                className={this.state.isLiked || this.props.isLiked ? 'liked-icon-active' : ''}
              >
                <HeartIcon />
              </button>
              <button>
                <Comment />
              </button>
            </div>
            <div className="info-post">
              <h4>{this.state.totalLikes} likes</h4>
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

export default PostDetails;
