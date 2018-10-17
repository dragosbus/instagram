import React from 'react';
import Post from './Post';

const Posts = props => {
  let postList = props.feedPosts ? (
    <ul>
      {props.feedPosts.map((post, i) => {
        return post !== null ? (
          <Post
            key={`${post.username}-${post.userId}-${i}`}
            index={i}
            post={post}
            calcTimePostCreated={props.calcTimePostCreated}
            likePost={props.likePost}
            userConnected={props.userConnected}
          />
        ) : (
          ''
        );
      })}
    </ul>
  ) : (
    ''
  );
  return postList;
};

export default Posts;
