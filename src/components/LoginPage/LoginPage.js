import React, { Component } from 'react';
import { ErrorSpan } from '../ErrorSpan/Span';
import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="login">
        <header>
          <h1 className="logo">Instagram</h1>
          <h3 className="intro">Sign up to see photos and videos from your friends.</h3>
        </header>
        <main>
          <button className="btn-login">Log in</button>
          <hr />
          <form className="register-form">
            <div>
              <input type="email" placeholder="Email" />
              <ErrorSpan />>
            </div>
            <div>
              <input type="text" placeholder="Full Name" />
              <ErrorSpan />
            </div>
            <div>
              <input type="text" placeholder="Username" />
              <ErrorSpan />
            </div>
            <div>
              <input type="password" placeholder="Password" />
              <ErrorSpan />
            </div>
            <div>
              <input type="password" placeholder="Repeat password" />
              <ErrorSpan />
            </div>
            <button type="submit">Register</button>
          </form>
          <p>
            By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy and
            how we use cookies and similar technology in our Cookies Policy.
          </p>
        </main>
        <footer>
          <p>2018 Instagram clone</p>
        </footer>
      </div>
    );
  }
}

export default LoginPage;
