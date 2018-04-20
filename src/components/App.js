import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/home.css';

class App extends Component {

  render() {
    let height=window.innerHeight/3 - 20;
    const divHeight= {
      height:height
    }
    return (
      <div className="App">
        <div style={divHeight} className="search-card food">
          <h4 className="search-title">DINE</h4>
        </div>
        <div style={divHeight} className="search-card play">
          <h4 className="search-title">PLAY</h4>
        </div>
        <div style={divHeight} className="search-card search">
          <h4 className="search-title">SEARCH</h4>
        </div>
      </div>
    );
  }
}

export default App;
