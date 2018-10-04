import React, { Component } from 'react';
import { auth, db } from '../../firebase/firebase';
import { ErrorSpan, MessageSpan } from '../ErrorSpan/Span';
import LoginModal from '../LoginModal/Login';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      email: {
        isValid: true,
        value: ''
      },
      fullName: {
        isValid: true,
        value: ''
      },
      username: {
        isValid: true,
        value: ''
      },
      pass: {
        isValid: true,
        value: ''
      },
      repeatPass: {
        isValid: true,
        value: ''
      },
      formIsValid: true,
      errorMessage: '',
      successMessage: ''
    };
  }

  toggleLoginModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  changeInputHandler = (e, stateTarget) => {
    if (e.target.value) {
      this.setState({
        [stateTarget]: {
          isValid: true,
          value: e.target.value
        }
      });
    } else {
      this.setState({
        [stateTarget]: {
          isValid: false,
          value: e.target.value
        }
      });
    }
  };
  
  onEmailChange = e => {
    this.changeInputHandler(e, 'email');
  };

  onFullNameChange = e => {
    this.changeInputHandler(e, 'fullName');
  };

  onUsernameChange = e => {
    this.changeInputHandler(e, 'username');
  };

  onPasswordChange = e => {
    this.changeInputHandler(e, 'pass');
  };

  onRepeatPasswordChange = e => {
    this.changeInputHandler(e, 'repeatPass');
  };

  submitRegister = e => {
    e.preventDefault();
    let { email, fullName, username, pass, repeatPass } = this.state;

    if (!email.value || !fullName.value || !pass.value || !repeatPass.value) {
      this.setState({
        formIsValid: false,
        errorMessage: 'Fill the inputs'
      });
      //iterate through state and get the state of the inputs
      //for the inputs without value, set isValid prop to false
      for (let state in this.state) {
        if (typeof this.state[state] === 'object') {
          if (!this.state[state].value) {
            this.setState({
              [state]: {
                value: this.state[state].value,
                isValid: false
              }
            });
          }
        }
      }
    } else {    
      if (pass.value !== repeatPass.value) {
        this.setState({
          formIsValid: false,
          errorMessage: 'Passwords dont match',
          pass: {
            value: this.state.pass.value,
            isValid: false
          },
          repeatPass: {
            value: this.state.repeatPass.value,
            isValid: false
          }
        });
      } else if (pass.value.length < 6) {
        this.setState({
          formIsValid: false,
          errorMessage: 'Password must be 6 or more characters long',
          pass: {
            value: this.state.pass.value,
            isValid: false
          }
        });
      } else {
        //register user here.What is up, are just error handlers
        auth.createUserWithEmailAndPassword(email.value, pass.value).then(() => {
          this.setState({
            formIsValid: true,
            successMessage: 'Welcome'
          });

          auth.onAuthStateChanged(user=> {
            if (user) {
              var uid = user.uid;
              db.ref(`users/${uid}`).set({
                id: uid,
                username: this.state.username.value,
                email: this.state.email.value,
                gender: '',
                profile_picture: 'https://www.sgbt.lu/uploads/tx_bisgbio/default-profile_01.png',
                fullName: this.state.fullName.value
              });
            }
          });
        }).catch(err=>{
          this.setState({
            formIsValid: false,
            errorMessage: err.message
          });
        });
      }
    }
  };

  render() {
    let { email, fullName, username, pass, repeatPass, errorMessage, formIsValid } = this.state;
    let messageSpan = !formIsValid ? (
      <MessageSpan message={errorMessage} formIsValid={formIsValid} />
    ) : (
      <span
        style={{
          display: this.state.successMessage ? 'block' : 'none'
        }}
        className="success-register"
      >
        {' '}
        "Welcome"{' '}
      </span>
    );

    return (
      <div className="login-page">
        <div className="intro-images">
          <img src="https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg" alt="intro" />
        </div>{' '}
        <div className="login">
          <header>
            <h1 className="logo"> Instagram </h1>{' '}
            <h3 className="intro"> Sign up to see photos and videos from your friends. </h3>{' '}
          </header>{' '}
          <main>
            <button className="btn-login" onClick={this.toggleLoginModal}>
              Log in
            </button>{' '}
            <hr />
            <form className="register-form" onSubmit={this.submitRegister}>
              <div>
                <input type="email" placeholder="Email" value={email.value} onChange={this.onEmailChange} />{' '}
                <ErrorSpan isValidInput={email.isValid} />{' '}
              </div>{' '}
              <div>
                <input type="text" placeholder="Full Name" value={fullName.value} onChange={this.onFullNameChange} />{' '}
                <ErrorSpan isValidInput={fullName.isValid} />{' '}
              </div>{' '}
              <div>
                <input type="text" placeholder="Username" value={username.value} onChange={this.onUsernameChange} />{' '}
                <ErrorSpan isValidInput={username.isValid} />{' '}
              </div>{' '}
              <div>
                <input type="password" placeholder="Password" value={pass.value} onChange={this.onPasswordChange} />{' '}
                <ErrorSpan isValidInput={pass.isValid} />{' '}
              </div>{' '}
              <div>
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={repeatPass.value}
                  onChange={this.onRepeatPasswordChange}
                />{' '}
                <ErrorSpan isValidInput={repeatPass.isValid} />{' '}
              </div>{' '}
              <button type="submit"> Register </button> {messageSpan}{' '}
            </form>{' '}
            <p>
              By signing up, you agree to our Terms.Learn how we collect, use and share your data in our Data Policy and
              how we use cookies and similar technology in our Cookies Policy.{' '}
            </p>{' '}
          </main>{' '}
          <footer>
            <p> 2018 Instagram clone </p>{' '}
          </footer>{' '}
        </div>{' '}
        <LoginModal toggleLoginModal={this.toggleLoginModal} showModal={this.state.showModal} />{' '}
      </div>
    );
  }
}

export default LoginPage;
