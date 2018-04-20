import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, logout } from '../actions/userActions';

class Header extends Component{
  render(){
    return (
      <nav>

            <ul>
              {
                this.props.user === null ? (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                ) : (
                  <li>
                    <Link onClick={() => this.props.logout()} to="/logout">Logout</Link>
                  </li>
                )
              }

            </ul>
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
