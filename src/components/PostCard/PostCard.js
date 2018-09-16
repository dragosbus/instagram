import React from 'react';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';

const PostCard = props => {
  return (
    <div className="card" onClick={props.showDetails}>
      <img src={props.image} />
      <div className="hovered">
        <div>
          <p>{props.likes}</p>
          <MdFavoriteBorder />
        </div>
        <div>
          <p>{props.comments}</p>
          <MdChatBubbleOutline />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
