import React, { Component } from 'react';
import './app.css';
import AppRouter from '../routes/app-router';

//** components */
import CompExample from './comp-example';

class App extends Component {
  componentDidMount() {

    setTimeout(() => {
      
    })
    fetch("/api/post", {
      method: 'POST',
      body: JSON.stringify({ user: 'john', password: 'johnspassword' }), // stringify JSON
      headers: new Headers({ "Content-Type": "application/json" }) // add headers
    })
    .then((response) => {
      console.log('RESPONSE :', response);
      return response.text();
    })
    .then((responseText) => {
      console.log('YO YO YO :', responseText)
    })
    /*
       this.callApi('/api/hello')
      .then(res => {
        console.log('::: res ', res);
        this.setState({ response: res.express })
      })
      .catch(err => console.log(err));


      fetch("/api/post", {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
          }),
        body: JSON.stringify({username: 'john', password: 'johnspassword'})
    })
    .then((response) => {
      console.log('RESPONSE :', response);
      return response.text();
    })
    .then((responseText) => {
      console.log('YO YO YO :', responseText)
    })
    */
/*
    const username = 'robot';
    const password = 'test';

    fetch("/contact-form", {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: JSON.stringify({username: username, password: password})
  })
  .then((response) => response.text())
  .then((responseText) => {
    console.log('YO YO YO')
    alert(responseText);
  })
  .catch((error) => {
    console.error(error);
  });
  */
    /*
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  };

  return fetch(`/form`, requestOptions)
      .then((d) => {
        console.log('YYOOOOOO', d);
      })
      .then(user => {
          // login successful if there's a user in the response
          if (user) {
              // store user details and basic auth credentials in local storage 
              // to keep user logged in between page refreshes
              user.authdata = window.btoa(username + ':' + password);
              localStorage.setItem('user', JSON.stringify(user));
          }

          return user;
      });
      */
    //** fetch and post data */

    // this.callApi('/hellotest')
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
    /*
    return;
    console.log('====');
    const username = 'robot';
    const password = 'test';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
          console.log('USER ', user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
        function handleResponse(response) {
          return response.text().then(text => {
              console.log(':: response ', response)
              console.log(':: text ', text)
          });
      }
      */
  }
  
  callApi = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (response.status !== 200) throw Error(responseJson.message);
    return responseJson;
  };
  render() {
    console.log('this state ', this.state);
    return (
      <div className="App">
        <AppRouter>
        </AppRouter>
      </div>
    );
  }
}
export default App;