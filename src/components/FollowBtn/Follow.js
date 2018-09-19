import React from 'react';
import './Follow.css';

const FollowBtn = props => {
  let btn;
  if (props.followers.includes(props.userDataId)) {
    btn = <button>Following</button>;
  } else {
    btn = <button onClick={() => props.follow(props.userId, props.userDataId)}>Follow</button>;
  }
  return btn;
};

export default FollowBtn;
