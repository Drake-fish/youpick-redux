import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/home.css';
import { getPreferences, savePreference } from '../actions/preferenceActions';
import { getUser } from '../actions/userActions';
import { fetchProducts } from '../actions/dineActions';
import { getLocation } from '../actions/locationAction';
import SearchComponent from './SearchComponent';
import TitleComponent from './TitleComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      search:'',
      searchOpen:false
    }
  }
  handleFood = () =>{
  !this.props.location ? this.props.getLocation() : null;
    this.props.history.push('/food');
  }
  handlePlay = () => {
  !this.props.location ? this.props.getLocation() : null;
    this.props.history.push('/play');
  }
  handleSearch = (e) => {
    e.preventDefault();
    !this.props.location ? this.props.getLocation() : null;
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
  handleSettings = () => {
    if(this.props.user){
      this.props.history.push('/preferences');
    }else{
      this.props.history.push('/login');
    }

  }
  render() {
    let search=(
      <div className="option-container">
        <SearchComponent title="DINE" click={this.handleFood} image={require("../images/food.jpg")}/>
        <SearchComponent title="SEARCH" click={this.toggleSearch} image={require("../images/searchimage.jpg")}/>
        <SearchComponent title="PLAY" click={this.handlePlay} image={require("../images/random.jpg")}/>
        <SearchComponent title="SETTINGS" click={this.handleSettings} icon={<i className="fas fa-cogs"></i>} image={null}/>
        <div className="modal"></div>
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
        <div className="option-container search-open">
          <SearchComponent title="DINE" click={this.handleFood} image={require("../images/food.jpg")}/>
          <SearchComponent title="SEARCH" click={this.toggleSearch} image={require("../images/searchimage.jpg")}/>
          <SearchComponent title="PLAY" click={this.handlePlay} image={require("../images/random.jpg")}/>
          <SearchComponent title="SETTINGS" click={this.handleSettings} image={require("../images/preferences.jpg")}/>
          <div onClick={this.toggleSearch} className="modal modal-open"></div>
          <div className="search-box search-box-open">
            <form onSubmit={this.handleSearch}>
              <input onChange={this.handleChange} type="text"
                     className="search-text search-text-open"
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
    }

    return (
      <div className="App">
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
