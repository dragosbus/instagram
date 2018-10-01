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
    users: [],
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
    //counter which stop fetching users when is 5
    let currentId = 0;
    getDataFromFirebase(`users/${this.props.userId}/following`)
      .then(res => Object.values(res).map(id => id.id))
      .then(res => {
        //get the id's of all users from following
        //iterate throught all users from following
        //and get data asked, and setState to users.Stop iterating when the currentId is 5
        res.map(user => {
          getDataFromFirebase(`users/${user}`)
            .then(res => {
              if (currentId < 1) {
                this.setState(
                  prevState => ({
                    users: prevState.posts.concat({
                      id: res.id,
                      profile_picture: res.profile_picture,
                      username: res.username
                    })
                  }),
                  () => {
                    //after the new state is updated, increment the currentId and pass to the next user if is less than 5, otherwise return false
                    currentId += 1;
                    console.log(this.state.users, currentId);
                  }
                );
              } else {
                return false;
              }
            })
            .then(res => {
              //when the currentId is 5 the prev callback return false
              if (res !== false) {
                console.log('users gets', currentId);
                //map through users fetched and get the last post
                this.state.users.map(user => {
                  getDataFromFirebase(`posts/${user.id}`).then(res => {
                    this.setState(
                      prevState => ({
                        posts: prevState.posts.concat(Object.assign({}, user, ...Object.values(res)))
                      }),
                      () => console.log(this.state.posts)
                    );
                  });
                });
              }
            });
        });
      });
  };

  componentDidMount() {
    //after the component mount, get the last post from 5 users like default data.The rest of the feed is populate on scroll event
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
