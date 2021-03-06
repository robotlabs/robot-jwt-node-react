import React, {Component} from 'react';
import './signin.css';

import userOptions from './../../user-options';

class Signin extends Component {
  state = {
    response: <div className='signin-response'>If you don't have an account, please <SignupButton handleClick={this.handleClick.bind(this)}></SignupButton></div>
  }
  componentDidMount() {
    //** use to debug and remove user */
    // localStorage.removeItem('user');

    //** check if we have already a user logged */
    this.isLogged();
  }
  componentDidUpdate() {
    this.isLogged();
  }
  isLogged() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      this.props.history.push('./route-contentlogged');
    } else {
        return {};
    }
  }
  onSubmit(e) {
    e.preventDefault();
    fetch("/api/log-user", {
      method: 'POST',
      body: JSON.stringify({ user: this.inputUser.value, password: this.inputPassw.value, userOptions: userOptions }),
      headers: new Headers({ "Content-Type": "application/json" })
    })
    .then((response) => {
      return response.text();
    })
    .then((responseObj) => {
      responseObj = reverseStringify(responseObj);
      if (!responseObj.logged) {
        this.setState({
          response: <div className='signin-response'><h1>error in your credentials.</h1>  <div>If you don't have an account, please 
            <SignupButton handleClick={this.handleClick.bind(this)}></SignupButton>
          </div></div>
        })
      } else {
        localStorage.setItem('user', JSON.stringify(responseObj));
        this.props.history.push('./route-contentlogged');
      }
    })
  }
  handleClick(e) {
    // e.preventDefault();
    this.props.history.push('./route-signup');
  }
  render() {
    return (
      <div className='signin-outer'>
      <div
        className='signin'>
          <h1>Sign-in</h1>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div>
              <input type="text" ref={(input) => this.inputUser = input} placeholder='username' name="username" required/>
            </div>
            <div>
              <input type="password" ref={(input) => this.inputPassw = input} placeholder='password' name="password" required/>
            </div>
            <div>
              <input type="submit" value="Sign in" />
            </div>
          </form>
      </div>
      {this.state.response}
      </div>
    )
  }
}
function reverseStringify(str) {
  try {
    var obj = JSON.parse(str); 
    return obj;
  } catch (ex) {
    console.error(ex);
    return {};
  }
}

const SignupButton = (props) => {
  return (
    <button className='signup-button' onClick={props.handleClick}>
      sign-up
    </button>
  )
}

export default Signin;