import React from 'react';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';

const PostElementList = props => {
  return (
    <div className="card" onClick={props.showDetails}>
      <img src={props.image} alt="Post card"/>
      <div className="hovered">
        <div>
          <p>{props.totalLikes}</p>
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

export default PostElementList;
