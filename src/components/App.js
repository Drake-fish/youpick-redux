import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/home.css';
import { getPreferences, savePreference } from '../actions/preferenceActions';
import { getUser } from '../actions/userActions';
import { fetchProducts } from '../actions/dineActions';
import { getLocation } from '../actions/locationAction';

class App extends Component {

  handleFood = () =>{
    if(this.props.location === null){
      this.props.getLocation();
    };
    this.props.history.push('/loadingFood');
  }
  render() {
    const divHeight= {
      height:window.innerHeight/3 - 20
    }

    return (
      <div className="App">
        <div style={divHeight} onClick={this.handleFood} className="search-card food">
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
function mapStateToProps(state, ownProps){
  console.log(state);
  return {
    user: state.user,
    userLoading: state.loading.user,
    preferences: state.preferences,
    location: state.location.location
  }
}

export default connect(mapStateToProps, { getUser, getPreferences, savePreference, fetchProducts, getLocation })(App);
