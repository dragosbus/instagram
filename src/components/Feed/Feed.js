import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFollowingPostsMiddleware} from '../../actionCreators/actions';

class Feed extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.userId);
  }
  render() {
    const {followingPosts} = this.props;
    return(
      <div className="feed">
        <ul>
          {
            followingPosts.map(post=>{
              return <li>{post.description}</li>
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