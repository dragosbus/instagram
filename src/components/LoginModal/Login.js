import React, { Component } from 'react';
import './Login.css';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onPasswordChange = e => {};

  onEmailChange = e => {};

  submitLogin = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div
        className="login-modal"
        onClick={this.props.toggleLoginModal}
        style={{ display: this.props.showModal ? 'flex' : 'none' }}
      >
        <form onSubmit={this.submitLogin}>
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginModal;
