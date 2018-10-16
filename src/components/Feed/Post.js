import React, { Component } from 'react';
import { Comment, HeartIcon } from '../Home/Icons';
import { Link } from 'react-router-dom';
import { getDataFromFirebase } from '../../utils/firebaseHandlers';

class Post extends Component {
  state = {
    isLiked: false
  };

  componentDidMount() {
    //when the post mount, if is liked add the classname
    this.checkLike(this.props.post.postId, this.props.post.userId, this.props.userConnected);
  }

  checkLike = (postId, owner, userId) => {
    //check if is liked handler
    getDataFromFirebase(`posts/${owner}/${postId}`).then(res => {
      const props = res
        ? Object.values(res).filter(prop => typeof prop === 'object' && prop !== null && !Array.isArray(prop))
        : [];

      props.forEach(user => {
        if (userId === user.userId) {
          this.setState({ isLiked: true });
        } else {
          return false;
        }
      });
    });
  };

  wasLikedHandler = () => {
    //how the like button is cliked, change the classname sync
    this.setState({isLiked:true})
  }

  render() {
    return (
      <li className="element-post">
        <div className="header-post">
          <Link to={`/${this.props.post.userId}`}>
            <img src={this.props.post.profile_photo} />
            <h4>{this.props.post.username}</h4>
          </Link>
        </div>
        <div className="main-post">
          <img src={this.props.post.photo} />
          <div className="actions">
            <button
              onClick={() => {
                this.wasLikedHandler();
                this.props.likePost(this.props.index);
              }}
              className={this.state.isLiked || this.props.post.isLiked ? 'liked-icon-active' : ''}
            >
              <HeartIcon />
            </button>
            <button>
              <Comment />
            </button>
          </div>
          <p>{this.props.post.likes} Likes</p>
          <p>
            <span>{this.props.post.username}:</span>
            {this.props.post.description}
          </p>
          <p>
            Created:
            {this.props.calcTimePostCreated(this.props.post.createdAt)}
          </p>
        </div>
      </li>
    );
  }
}

export default Post;
