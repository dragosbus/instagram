import React from 'react';

const PostCard = props => {
  return(
    <div className="card">
      <img src={props.image}/>
    </div>
  );
};

export default PostCard;