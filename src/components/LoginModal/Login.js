import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginMiddleware } from '../../actionCreators/actions';
import './Login.css';

import Input from '../Input/Input';

class LoginModal extends Component {
  submitLogin = e => {
    e.preventDefault();
    this.props.logIn({
      email: this._email.state.value,
      password: this._pass.state.value
    });
  };
  
  render() {
    
    const { userConnected } = this.props;
    let errorSpan = userConnected.error ? <span className="error-login">{userConnected.error}</span> : '';
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
          <Input type="email" placeHolder="Email" ref={email => (this._email = email)} />
          <Input type="password" placeHolder="Password" ref={pass => (this._pass = pass)} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logIn: loginMiddleware
    },
    dispatch
  );

const mapStateToProps = state => ({
  userConnected: state.userConnected
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
