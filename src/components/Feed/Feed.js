import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFollowingPostsMiddleware, getUserDataMiddleware} from '../../actionCreators/actions';
import {
  firebase
} from '../../firebase/firebase';

class Feed extends Component {
  state = {
    posts: []
  }
  
  componentDidMount() {
    this.props.getPosts(this.props.userId);
  }

  render() {
    const {followingPosts} = this.props;
    console.log(followingPosts)
    return(
      <div className="feed">
        <ul>
          {
            followingPosts.map(post=>{
              return <li key={post.description}>
                <div className="header-post">
                  <img src={post.profile_photo}/>
                  <h4>{post.username}</h4>
                </div>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  followingPosts: state.followingPosts
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPosts: getFollowingPostsMiddleware
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feed);