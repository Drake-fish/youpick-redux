import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/home.css';
import { getPreferences, savePreference } from '../actions/preferenceActions';
import { getUser } from '../actions/userActions';
import { fetchProducts } from '../actions/dineActions';
import { getLocation } from '../actions/locationAction';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      search:'',
      searchOpen:false
    }
  }
  handleFood = () =>{
    if(this.props.location === null){
      this.props.getLocation();
    };
    this.props.history.push('/food');
  }
  handlePlay = () => {
    if(this.props.location === null){
      this.props.getLocation();
    }
    this.props.history.push('/play');
  }
  handleSearch = (e) => {
    e.preventDefault();
    if(this.props.location === null){
      this.props.getLocation();
    }
    this.props.history.push(`/searchresult/${this.state.search}`);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  toggleSearch = () => {
    this.setState({searchOpen:!this.state.searchOpen});
  }
  render() {
    const divHeight= {
      height:window.outerHeight/3 - 40
    }
    let search=(
      <div onClick={this.toggleSearch}  style={divHeight} className="search-card search">
        <h4 className="search-title">SEARCH</h4>
        <div className="search-box">
          <form>
            <input type="text"
                   className="search-text"
                   value={this.state.search}
                   placeholder="Search"
                   name="search"
                   required
            />
            <i className="fas fa-search"></i>
          </form>
        </div>
      </div>
    );
    if(this.state.searchOpen){
      search=(
        <div style={divHeight} className="search-card search">
          <h4 className="search-title search-title-closed">SEARCH</h4>
          <div className="search-box search-box-open">
          <form onSubmit={this.handleSearch}>
            <input type="text"
                   className="search-text search-text-open"
                   value={this.state.search}
                   placeholder="Search"
                   onChange={this.handleChange}
                   name="search"
                   required
            />
            <i onClick={this.handleSearch} className="fas fa-search fa-search-open"></i>
          </form>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <div style={divHeight} onClick={this.handleFood} className="search-card food">
          <h4 className="search-title">DINE</h4>
        </div>
        <div style={divHeight} onClick={this.handlePlay} className="search-card play">
          <h4 className="search-title">PLAY</h4>
        </div>
        {search}
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
