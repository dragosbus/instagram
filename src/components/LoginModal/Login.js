import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginMiddleware, getPostsMiddleware } from '../../actionCreators/actions';
import './Login.css';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  submitLogin = e => {
    e.preventDefault();
    this.props.logIn(this.state);
  };

  render() {
    let errorSpan = this.props.user.error ? <span className="error-login">{this.props.user.error}</span> : '';
    return (
      <div
        className="login-modal"
        onClick={e => {
          if (e.target.className === 'login-modal') {
            this.props.toggleLoginModal();
          }
        }}
        style={{ display: this.props.showModal ? 'flex' : 'none' }}
      >
        <form onSubmit={this.submitLogin}>
          {errorSpan}
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logIn: loginMiddleware,
      getOwnPosts: getPostsMiddleware
    },
    dispatch
  );

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
