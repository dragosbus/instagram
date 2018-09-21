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

  handleFile = e => {
    let url = window.URL.createObjectURL(e.target.files[0])
    this.setState({photo: url});
  };

  render() {
    return (
      <div className="add">
        <form onSubmit={this.onAddPost}>
          <input
            type="file"
            id="photo"
            onChange={e => {
              this.handleFile(e);
            }}
          />
          <input type="text" value={this.state.description} onChange={this.onChangeDescription} />
          <button type="submit">Add Post</button>
        </form>
        <div id="fileList">
          <p>{this.state.photo}</p>
        </div>
      </div>
    );
  }
}

export default AddPage;
