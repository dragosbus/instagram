import React from 'react';
import './Follow.css';

const FollowBtn = props => {
  let btn;
  if (props.followers.includes(props.userDataId)) {
    btn = <button className="btn follow">Following</button>;
  } else {
    btn = <button onClick={() => props.follow(props.userId, props.userDataId)} className="btn not-follow">Follow</button>;
  }
  return btn;
};

export default FollowBtn;
