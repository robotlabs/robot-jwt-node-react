import React, {Component} from 'react';
import './signin.css';

class Signin extends Component {
  componentDidMount() {
    // this.userInput = React.createRef();
    // this.userPassw = React.createRef();
    this.test = React.createRef();

    
    
    
  }
  onSubmit(e) {
    e.preventDefault()
    // this.props.signinSubmit({
    //   user: this.inputUser, passw: this.inputPassw
    // });
    console.log('this.inputUser ', this.inputUser);
    fetch("/api/log-user", {
      method: 'POST',
      body: JSON.stringify({ user: this.inputUser.value, password: this.inputPassw.value }),
      headers: new Headers({ "Content-Type": "application/json" })
    })
    .then((response) => {
      console.log('+ RESPONSE :', response);
      return response.text();
    })
    .then((responseObj) => {
      console.log('+ YO :', responseObj);
      console.log('ttt :', reverseStringify(responseObj));
      responseObj = reverseStringify(responseObj);
      if (!responseObj.logged) {
        console.log('this props ', this.props.history);
        this.props.history.push('./route-signup')
      } else {
        console.log('--------');
        this.props.history.push('./route-contentlogged')
      }
    })
  }
  render() {
    return (
      <div
        className='signin'>
          :: Signin ::
          <form onSubmit={this.onSubmit.bind(this)}>
            <div>
              <input type="text" ref={(input) => this.inputUser = input} placeholder='username' name="username" required/>
            </div>
            <div>
              <input type="password" ref={(input) => this.inputPassw = input} placeholder='password' name="password" required/>
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
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
export default Signin;