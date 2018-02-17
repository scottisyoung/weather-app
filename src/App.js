import React, { Component } from 'react';
import './App.css';
import Weatherapi from '../src/components/weatherapi/weatherapi.js';
import Header from '../src/header-footer/header.js';
import Footer from '../src/header-footer/footer.js';

class App extends Component {
  render () {
    return (
      <div className="App">
          <Header />
          <Weatherapi />
          <Footer />
      </div>
    );
  }
}

export default App;


