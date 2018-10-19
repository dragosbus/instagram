import React from 'react';
import './Post.css';
import { Comment, HeartIcon } from '../Home/Icons';
import { Link } from 'react-router-dom';
import {getDataFromFirebase, totalLikes} from '../../utils/firebaseHandlers';

class PostDetails extends React.Component {
  state = {
    isLiked: false,
    totalLikes: 0
  };

  wasLikedHandler = () => {
    //how the like button is cliked, change the classname sync
    this.setState({ isLiked: true });
  };

  componentWillReceiveProps() {
    let totalLikesN = totalLikes(this.props.postId, this.props.userId);
    
    totalLikesN.then(res=>{
      this.setState({totalLikes: res})
    })
  }

  checkLike = (postId, owner, userId) => {
    //check if is liked handler
    return getDataFromFirebase(`posts/${owner}/${postId}`).then(res => {
      const props = res
        ? Object.values(res).filter(prop => typeof prop === 'object' && prop !== null && !Array.isArray(prop))
        : [];
        
      props.forEach(user => {
        if (userId === user.userId) {
          return true;
        } else {
          return false;
        }
      });
    });
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
