/*
Try to set the data for the profile page by checking if of the user in session
and not by routes, with the id of the user clicked.

*/


import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getUserProfileClikedMiddleware} from '../../actionCreators/actions';
import './Profile.css';

import PostCard from '../PostCard/PostCard';
import PostDetails from '../PostDetails/Post';

class Profile extends Component {
  state = {
    posts: [],
    currentPost: {},
    showDetailsPost: false
  }

  makePosts = () => {
    for(let id in this.props.ownPosts) {
      this.setState(prevState=>({
        posts: prevState.posts.concat(this.props.ownPosts[id])
      }));
    }
  }

  toggleDetailsPost = () => {
    this.setState({showDetailsPost: !this.state.showDetailsPost});
  };

  showDetails = post =>  {
    this.setState({currentPost: post});
    this.toggleDetailsPost();
  }

  componentDidMount() {
    this.makePosts();
  }

  render() {
    console.log(this.props)
    let data = this.props.path === '/profile' ? this.props.userData : this.props.userClickedData;

    return (
      <div className="profile">
        <div className="profile-header">
          <img src="https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png" />
          <p>{data.username}</p>
          <button>Edit Profile</button>
          <h4>{data.fullName}</h4>
        </div>
        <div className="profile-data">
          <p>{this.state.posts.length} posts</p>
          <p>0 followers</p>
          <p>0 following</p>
        </div>
        <div className="profile-posts">
          {
            this.state.posts.map((post, i)=> {
              return <PostCard key={i} showDetails={()=>this.showDetails(this.state.posts[i])} image={post.photo} likes={post.likes} comments={0}/>
            })
          }
        </div>
        <PostDetails 
          data={data} 
          postImg={this.state.currentPost.photo} 
          likes={this.state.currentPost.likes} 
          createdAt={0} 
          showDetailsPost={this.state.showDetailsPost}
          toggleModal={this.toggleDetailsPost}
          userId={this.state.currentPost.userId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ownPosts: state.ownPosts,
  userData: state.userData,
  userClickedData: state.userClickedData,
  userPosts: state.userPosts
});

export default connect(
  mapStateToProps,
  null
)(Profile);
