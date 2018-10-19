import React from 'react';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';
import { totalLikes } from '../../utils/firebaseHandlers';

class PostElementList extends React.Component {
  state={
    likes: 0
  };
  componentDidMount() {
    totalLikes(this.props.postId,this.props.userId).then(res=>{
      this.setState({likes: res});
    });
  }
  render() {
    return (
      <div className="card" onClick={this.props.showDetails}>
        <img src={this.props.image} alt="Post card" />
        <div className="hovered">
          <div>
            <p>{this.state.likes}</p>
            <MdFavoriteBorder />
          </div>
          <div>
            <p>{this.props.comments}</p>
            <MdChatBubbleOutline />
          </div>
        </div>
      </div>
    );
  }
}

export default PostElementList;
