import React, {Component} from 'react';
import './content-logged.css';

class ContentLogged extends Component {
  state = {
    results: ''
  }
  async fetchData() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const userOptions = JSON.stringify(user.userOptions);
      var obj = {  
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `x${token}`,
          'user-options': `${userOptions}`
        })
      }
      const response = await fetch('/api/hello', obj);
      const responseJson = await response.json();
      if (response.status !== 200) throw Error(responseJson.message);
      console.log('D ', responseJson)
      return responseJson;
  } 
  render () {
    return (
      <div
        className='content-logged-box'>
        <button 
          onClick={() => {
            const x = this.fetchData.bind(this);

            x().then((r) => {
                console.log('x ', r);
              }
            )
            
          }} 
          className='bt bt1'>Get Number (+ token)</button>
        <button 
          onClick={() => {

          }}
          className='bt bt2'>Get Number (no token)</button>
        <button 
          onClick={() => {

          }}
          className='bt bt3'>Get Number (all unprotected api)</button>

          {this.state.results}
      </div>
    )
  }
}
  
export default ContentLogged;