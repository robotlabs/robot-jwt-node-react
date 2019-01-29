import React, { Component } from 'react';
import './app.css';
import AppRouter from '../routes/app-router';

//** components */
import Footer from './components/footer/footer';
import Header from './components/header/header';

class App extends Component {
  componentDidMount() {}
  
  callApi = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (response.status !== 200) throw Error(responseJson.message);
    return responseJson;
  };
  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className='content'>
          {this.props.children}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default App;