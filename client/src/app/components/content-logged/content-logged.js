import React, {Component} from 'react';
import './content-logged.css'
class ContentLogged extends Component {
  state = {
    results: ''
  }
  async fetchData() {
    const token = {'x': 11111111111111}
      var obj = {  
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'x-access-token': token
        }),
        // body: JSON.stringify({ user: 'xx1', password: 'eee' }),
      }
      
      // if (token) {
      //   obj.headers["Authorization"] = `Token ${token}`;
      // }
      const response = await fetch('/api/hello2', obj);
      const responseJson = await response.json();
      if (response.status !== 200) throw Error(responseJson.message);
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