import React from 'react';
import './Post.css';
import { Comment, HeartIcon } from '../Home/Icons';
import { Link } from 'react-router-dom';

class PostDetails extends React.Component {
  state = {
    isLiked: false
  };

  wasLikedHandler = () => {
    //how the like button is cliked, change the classname sync
    this.setState({ isLiked: true });
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
                  this.wasLikedHandler();
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

export default PostDetails;
