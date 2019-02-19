import React, {Component} from 'react';
import './content-logged.css';

class ContentLogged extends Component {
  state = {
    responseOk: '',
    responseWrongToken: '',
    responseNoToken: '',
    responseWrongUserOptions: '',
    responsePublic: ''
  }
  constructor(props) {
    super(props);
    this.fetchDataToken = this.fetchDataToken.bind(this);
    this.fetchDataWrongToken = this.fetchDataWrongToken.bind(this);
    this.fetchDataWrongUserOptions = this.fetchDataWrongUserOptions.bind(this);
    this.fetchDataNoToken = this.fetchDataNoToken.bind(this);
    this.fetchDataPublic = this.fetchDataPublic.bind(this);
    this.logout = this.logout.bind(this);
  }
  fetchDataToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const userOptions = JSON.stringify(user.userOptions);
    this.fetchData(token, userOptions)
      .then((responseJson) => {
        this.setState({responseOk: responseJson.message});
      });
  }
  fetchDataWrongToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = 'xxxx';
    const userOptions = JSON.stringify(user.userOptions);
    this.fetchData(token, userOptions)
      .then((responseJson) => {
        this.setState({responseWrongToken: responseJson.message});
      });
  }
  fetchDataNoToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userOptions = JSON.stringify(user.userOptions);
    this.fetchData(null, userOptions)
      .then((responseJson) => {
        this.setState({responseNoToken: responseJson.message});
      });
  }
  fetchDataWrongUserOptions() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    user.userOptions.issuer = 'xxx'
    const userOptions = JSON.stringify(user.userOptions);
    
    this.fetchData(token, userOptions)
      .then((responseJson) => {
        this.setState({responseWrongUserOptions: responseJson.message});
      });
  }
  async fetchDataPublic() {
    console.log('si ciao')
    const response = await fetch('/api/hello', {});
    const responseJson = await response.json();
    if (response.status !== 200) throw Error(responseJson.message);
    console.log('eh', responseJson)
    this.setState({responsePublic: responseJson.message});
  }
  async fetchData(token, userOptions) {
    var obj = {  
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        'user-options': `${userOptions}`
      })
    }
    const response = await fetch('/api/hello-protected', obj);
    const responseJson = await response.json();
    if (response.status !== 200) throw Error(responseJson.message);
    return responseJson;
  } 
  logout() {
    localStorage.removeItem('user');
    this.props.history.push('./route-signin');
  }
  render () {
    return (
      <div>
      <button 
          onClick={this.logout} 
          className='bt'>
            Logout
          </button>
      <div
        className='content-logged-box'>
        <button 
          onClick={this.fetchDataToken} 
          className='bt'>
            <p>Get Number (+ token)</p>
            <p>{this.state.responseOk}</p>
          </button>
        <button 
          onClick={this.fetchDataWrongToken}
          className='bt'>
          <p>Get Number (Wrong token)</p>
          <p>{this.state.responseWrongToken}</p>
        </button>
        <button 
          onClick={this.fetchDataNoToken}
          className='bt'>
          <p>Get (no token)</p>
          <p>{this.state.responseNoToken}</p>
        </button>
        <button 
          onClick={this.fetchDataWrongUserOptions}
          className='bt'>
          <p>Get (wrong useroptions)</p>
          <p>{this.state.responseWrongUserOptions}</p>
        </button>
        <button 
          onClick={this.fetchDataPublic}
          className='bt'>
          <p>Get (all unprotected api)</p>
          <p>{this.state.responsePublic}</p>
        </button>
      </div>
      </div>
    )
  }
}
  
export default ContentLogged;