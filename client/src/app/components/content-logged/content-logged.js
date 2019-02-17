import React, {Component} from 'react';
import './content-logged.css';

import userOptions from './../../user-options';

class ContentLogged extends Component {
  state = {
    results: ''
  }
  async fetchData() {
    const user = localStorage.getItem('user')//{'x': 11111111111111}
    console.log('user ', user);
    userOptions.issuer = 'rob'
    const token = JSON.parse(user).token;
      var obj = {  
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
          'user-options': userOptions
          // 'x-access-token': token
        })//,
        // body: JSON.stringify({ user: 'xx1', password: 'eee' }),
      }
      console.log('++ token', );
      if (token) {
        console.log(':::>>>>>>>>>>>>>token ', token);
        //obj.headers["Authorization"] = `Token ${token}`;
      }
      console.log('il cristo morto + ', obj)
      const response = await fetch('/api/hello2', obj);
      const responseJson = await response.json();
      console.log('D ', response)
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