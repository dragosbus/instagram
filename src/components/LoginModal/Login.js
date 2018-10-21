import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginMiddleware } from '../../actionCreators/actions';
import './Login.css';

import Input from '../Input/Input';
import { Spinner } from '../FetchSpinner/Spinner';

class LoginModal extends Component {
  state = {
    regiterBtnDisabled: false
  };

  submitLogin = e => {
    e.preventDefault();
    this.setState({ regiterBtnDisabled: true }, () => {
      this.props.logIn({
        email: this._email.state.value,
        password: this._pass.state.value
      });
    });
  };

  componentWillReceiveProps() {
    //when is returned an error, we should activate the login button
    //after the login button is clicked, new props are received from redux store
    this.setState({regiterBtnDisabled: false});
  }

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
          <button type="submit" disabled={this.state.regiterBtnDisabled}>
            <Spinner {...this.state} />
            Login
          </button>
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
