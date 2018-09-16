import React, { Component } from 'react';
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
    for(let id in this.props.reduxProps.posts) {
      this.setState(prevState=>({
        posts: prevState.posts.concat(this.props.reduxProps.posts[id])
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
    return (
      <div className="profile">
        <div className="profile-header">
          <img src="https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png" />
          <p>{this.props.reduxProps.userData.username}</p>
          <button>Edit Profile</button>
          <h4>{this.props.reduxProps.userData.fullName}</h4>
        </div>
        <div className="profile-data">
          <p>{this.state.posts.length} posts</p>
          <p>0 followers</p>
          <p>0 following</p>
        </div>
        <div className="profile-posts">
          {
            this.state.posts.map((post, i)=> {
              return <PostCard key={i} showDetails={()=>this.showDetails(this.state.posts[i])} image={post.photo} likes={post.likes}/>
            })
          }
        </div>
        <PostDetails 
          data={this.props.reduxProps} 
          postImg={this.state.currentPost.photo} 
          likes={this.state.currentPost.likes} 
          createdAt={0} 
          showDetailsPost={this.state.showDetailsPost}
          toggleModal={this.toggleDetailsPost}
        />
      </div>
    );
  }
}

export default Profile;
