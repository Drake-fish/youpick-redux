import React, { Component } from 'react';
import { connect } from 'react-redux';
// with withRouter you can get access to the history object property
import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component{
  componentDidUpdate(){
    //make sure the loading is done then if no user
    //the push them to the login page
    const {userLoading, user} = this.props;
    if(userLoading === false && !user){
      this.props.history.push('/login');
    }
  }
  render(){
    //destructuring so I do'nt have to use this.props.user etc..
    const { user, userLoading, children } = this.props;
    return (userLoading === false && user) ? <div>{children}</div> : null;
  }
}

function mapStateToProps(state, ownProps){
  return {
    user: state.user,
    userLoading: state.loading.user
  }
}

export default withRouter(connect(mapStateToProps )(AuthenticatedComponent));
