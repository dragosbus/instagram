import React from 'react';
import './Follow.css';

const FollowBtn = props => {
  let btn;
  if (props.isFollower) {
    btn = (
      <button className="btn follow" onClick={props.follow}>
        Following
      </button>
    );
  } else {
    btn = (
      <button onClick={props.follow} className="btn not-follow">
        Follow
      </button>
    );
  }
  return btn;
};

export default FollowBtn;
