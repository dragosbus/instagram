import React from 'react';
import './Post.css';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

class PostDetails extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div className="overlay" style={{ display: this.props.showDetailsPost ? 'block' : 'none' }}>
        <button className="close-post-modal" onClick={this.props.toggleModal}>X</button>
        <div className="post-details">
          <div className="header">
            <Link to={`/:${this.props.useridfrompostkey}`}>
              <img src={data.userData.profile_picture} />
              <p>{data.userData.username}</p>
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

export default PostDetails;
