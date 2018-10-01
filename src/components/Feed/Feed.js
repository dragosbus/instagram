import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostsForFeed } from '../../actionCreators/actions';
import { getDataFromFirebase } from '../../utils/firebaseHandlers';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder, MdChatBubbleOutline } from 'react-icons/md';

import './Feed.css';

class Feed extends Component {
  state = {
    posts: []
  };
  // handleScroll = e => {
  //   let id = Math.floor(e.target.scrollingElement.scrollTop / 487);
  //   console.log(e.target.scrollingElement.scrollTop);
  //   this.setState(
  //     prevState => ({
  //       posts: prevState.posts.concat(post[id])
  //     }),
  //     () => console.log(post)
  //   );
  // };

  getFivePosts = () => {
    getDataFromFirebase(`users/${this.props.userId}/following`)
      .then(res => Object.values(res).map(id => id.id))
      .then(res => {
        res.map(user => {
          getDataFromFirebase(`users/${user}`).then(res => {
            this.setState(prevState => ({
              posts: prevState.posts.concat(
                {
                  id: res.id,
                  profile_picture: res.profile_picture,
                  username: res.username,
                }
              )
            }));
          });
        });
      });
  };

  componentDidMount() {
    this.getFivePosts();
    // this.props.getPostsForFeed(this.props.userId);
    // if(typeof this.props.feedPosts === 'function') {
    //   this.setState({currentPost: this.props.feedPosts().next()})
    // }
    // window.addEventListener('scroll', e=>{
    //   console.log(this.props.feedPosts);
    // });
    // window.addEventListener('click', e=> {
    //   if(typeof this.props.feedPosts === 'function') {
    //     console.log();
    //   }
    // });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div className="feed">
        {/* <ul>
          {this.state.posts.map((post, i) => {
            return (
              <li key={`${post.username}-${post.userId}-${i}`}>
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
        </ul> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedPosts: state.feedPosts
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPostsForFeed: getPostsForFeed
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
