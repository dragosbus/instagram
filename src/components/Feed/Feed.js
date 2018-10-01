import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFollowingUsers } from '../../actionCreators/actions';
import { getDataFromFirebase } from '../../utils/firebaseHandlers';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';

import './Feed.css';

class Feed extends Component {
  state = {
    posts: []
  };
  handleScroll = (e, post) => {
    let id = Math.floor(e.target.scrollingElement.scrollTop / 487);
    console.log(e.target.scrollingElement.scrollTop);
    this.setState(
      prevState => ({
        posts: prevState.posts.concat(post[id])
      }),
      () => console.log(post)
    );
  };

  getPosts = async () => {
    await getDataFromFirebase(`users/${this.props.userId}/following`)
      .then(res => Object.values(res).map(id => id.id))
      .then(res => {
        this.props.getFollowingUsers(res);
      });
    return this.props.followingUsers;
  };

  componentDidMount() {
    //should be refactored.set state is called for every following user
    this.getPosts().then(res => {
      res.forEach(id => {
        getDataFromFirebase(`posts/${id}`).then(post => {
          console.log(Object.values(post))
          this.setState(prevState=>({
            posts: prevState.posts.concat(Object.values(post)[Object.values(post).length - 1])
          }), ()=>{
            window.addEventListener('scroll', e=>{
              let id = Math.floor(e.target.scrollingElement.scrollTop / 487);
              if(!this.state.posts.includes(Object.values(post)[id])) {
                this.setState(prevState=>({
                  posts: prevState.posts.concat(Object.values(post)[id])
                }));
              }
            });
          });
        });
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div className="feed">
        <ul>
          {this.state.posts.map((post, i) => {
            return (
              <li key={`${post.userId}-${i}`}>
                <div className="header-post">
                  <Link to={`/${post.userId}`}>
                    <img src={post.profile_photo} />
                    <h4>{post.username}</h4>
                  </Link>
                </div>
                <div className="main-post">
                  <img src={post.photo} />
                  <div className="actions">
                    <button>
                      <MdFavoriteBorder />
                    </button>
                    <button>
                      <MdChatBubbleOutline />
                    </button>
                  </div>
                  <p>{post.likes} Likes</p>
                  <p>
                    <span>{post.username}:</span>
                    {post.description}
                  </p>
                  <p>Created at time ago</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  followingUsers: state.followingUsers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFollowingUsers: getFollowingUsers
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
