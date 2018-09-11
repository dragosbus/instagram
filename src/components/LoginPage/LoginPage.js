import React, { Component } from 'react';
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
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Repeat password" />
            <button type="submit">Register</button>
          </form>
          <p>By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookies Policy.</p>
        </main>
        <footer>
            <p>2018 Instagram clone</p>
        </footer>
      </div>
    );
  }
}

export default LoginPage;
