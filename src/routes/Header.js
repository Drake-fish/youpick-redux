import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, logout } from '../actions/userActions';
import '../styles/nav.css';

class Header extends Component{
  render(){
    return (
      <nav>


              {
                this.props.user === null ? (
                <ul>
                  <li>
                    <Link to="/login">
                      <i className="fas fa-user-circle logged-out"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <i className="fas fa-sliders-h"></i>
                    </Link>
                  </li>
                </ul>
                ) : (
                <ul>
                  <li>
                    <Link onClick={() => this.props.logout()} to="/logout">
                      <i className="fas fa-user-circle logged-in"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/preferences">
                      <i className="fas fa-sliders-h"></i>
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
    user: state.user
  }
}

export default connect(mapStateToProps, {getUser, logout} )(Header);
