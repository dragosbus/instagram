import React from 'react';

export const ActivityElement = props => {
  return (
    <li>
      <img src={props.profile_picture} />
      <p>{props.username} {props.activity}</p>
    </li>
  );
};
