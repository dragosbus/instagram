import React, { Component } from 'react';
import { db } from '../../firebase/firebase';

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      description: '',
      createdAt: Date.now()
    };
  }

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onChangePhoto = e => {
    this.setState({ photo: e.target.value });
  };

  onAddPost = e => {
    e.preventDefault();
    let newPosts = db.ref(`posts/${this.props.userId}`).push();
    newPosts.set({
      userId: this.props.userId,
      photo: this.state.photo,
      description: this.state.description,
      likes: 0
    });
    
  };

  render() {
    return (
      <div className="add">
        <form onSubmit={this.onAddPost}>
          <input type="text" value={this.state.photo} onChange={this.onChangePhoto} />
          <input type="text" value={this.state.description} onChange={this.onChangeDescription} />
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

export default AddPage;
