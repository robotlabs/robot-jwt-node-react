import React, {Component} from 'react';
import './signup.css';

class Signup extends Component {
  state = {
    response: <div className='signin-response'>Register here any username and any password, and press signup</div>
  }
  componentDidMount() {}
  onSubmit(e) {
    e.preventDefault();

    console.log('user :', this);
    console.log('passw :', this.inputPassw.value);
    // this.props.signinSubmit({
    //   user: this.inputUser, passw: this.inputPassw
    // });
    fetch("/api/register-user", {
      method: 'POST',
      body: JSON.stringify({ user: this.inputUser.value, password: this.inputPassw.value }),
      headers: new Headers({ "Content-Type": "application/json" })
    })
    .then((response) => {
      console.log(':: RESPONSE ::', response);
      return response.text();
    })
    .then((responseObj) => {
      responseObj = reverseStringify(responseObj);
      console.log('responseObj :', responseObj);
      if (responseObj.registered) {
        this.props.history.push('./route-signin');
      }
    //   if (!responseObj.logged) {
    //     // this.props.history.push('./route-signup')
    //     this.setState({
    //       response: <div className='signin-response'><h1>error in your credentials.</h1>  <div>If you don't have an account, please <a href='./route-signup'>sign-up</a></div></div>
    //     })
    //   } else {
    //     this.props.history.push('./route-contentlogged')
    //   }
    })
  }
  render() {
    return (
      <div className='signin-outer'>
      <div
        className='signup'>
          <h1>Sign-up</h1>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div>
              <input type="text" autoComplete="off" ref={(input) => this.inputUser = input} placeholder='choose a username' name="username" required/>
            </div>
            <div>
            <input  readOnly  onFocus={(e) => {
                e.target.removeAttribute('readonly');
              }} type="password" ref={(input) => this.inputPassw = input} placeholder='choose a password' name="password" required/>
            </div>
            <div>
              <input type="submit" value="Sign up" />
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
export default Signup;