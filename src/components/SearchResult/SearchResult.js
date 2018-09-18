import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResult.css';

export const SearchResult = props => {
  return (
    <div className="search-result" style={{display: props.inpusIsFocused ? 'block' : 'none'}}>
      <ul>
        {props.users.map(user => {
          return (
            <li key={user.id}>
              <Link to={`/${user.id}`}>
                <img src={user.profile_picture} />
                <p>{user.username}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
