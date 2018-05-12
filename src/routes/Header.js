import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, logout } from '../actions/userActions';
import { getLocation } from '../actions/locationAction';

import '../styles/nav.css';

class Header extends Component{

    constructor(props){
      super(props);
      console.log(this.props.error);
      this.state={
        error:this.props.error
      }
    }

  handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.value){
      this.setState({error:''});
      }
  }
  render(){
    //TODO Break out error into it's own component!
    console.log(this.state.error);
    let error;
    if(this.state.error !== ''){
      error=(
        <div className="no-location">
          <h2>Location was not found!</h2>
          <form onSubmit={this.handleSubmit}>
           <input type="text" placeholder="city"/>
           <button>Submit</button>
          </form>
        </div>
      );
    }
    return (
      <nav>
          {error}

              {
                this.props.user === null ? (
                <ul>
                {
                  this.props.loadingLocation ? (
                    <li className="location-loader" >
                      <Link to="/">
                        <i className="fas fa-spinner fa-pulse"></i>
                      </Link>
                      <p>Searching</p>
                    </li>
                  ) : (
                    <li>
                      <Link to="/">
                        <i className="fas fa-comment"></i>
                      </Link>
                    </li>
                  )
                }
                  <li className="youpick">
                    <h1>YOU PICK</h1>
                  </li>
                  <li className="login-nav">
                    <Link to="/login">
                      <i className="fas fa-user-circle logged-out"></i>
                        <p>Login</p>
                    </Link>
                  </li>
                </ul>
                ) : (
                <ul>
                  {
                    this.props.loadingLocation ? (
                      <li className="location-loader" >
                        <Link to="/">
                          <i className="fas fa-spinner fa-pulse"></i>
                        </Link>
                        <p>Searching</p>
                      </li>
                    ) : (
                      <li>
                        <Link to="/">
                          <i className="fas fa-comment"></i>
                        </Link>
                      </li>
                    )
                  }
                  <li className="youpick">
                    <h1><a href="/">YOU PICK</a></h1>
                  </li>
                  <li className="login-nav">
                    <Link onClick={() => this.props.logout()} to="/logout">
                      <i className="fas fa-user-circle logged-in"></i>
                      <p>Logout</p>
                    </Link>
                  </li>
                </ul>
                )
              }
      </nav>
    );
  }
}
function mapStateToProps(state, ownProps){
  return {
    user: state.user,
    location: state.location.location,
    loadingLocation: state.location.loadingLocation,
    error:state.location.error
  }
}

export default connect(mapStateToProps, {getUser, getLocation, logout} )(Header);
