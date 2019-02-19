import React, { Component } from 'react';
import './app.css';

//** components */
import Footer from './components/footer/footer';
import Header from './components/header/header';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header
          classNameProp={"row header"}>
        </Header>
        <div className='row content'>
          {this.props.children}
        </div>
        <Footer
          classNameProp='row footer'>
        </Footer>
      </div>
    );
  }
}
export default App;