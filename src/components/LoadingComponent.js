import React, { Component } from 'react';
import { connect } from 'react-redux';
// with withRouter You can get access to the history object’s properties
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userActions';


class LoadingComponent extends Component {
    componentWillMount() {
      console.log(this.props);
        const { userLoading, getUser } = this.props;
        // if we havent tried to load the user, load user
        if (userLoading === undefined) {
            getUser();
        }
    }

    render() {
        const { userLoading,  children, user } = this.props;
        if (!userLoading || user === null) {
            return <div>{children}</div>;
        } else {
            return <div>LOADING...</div>;
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default withRouter(connect(mapStateToProps, { getUser })(LoadingComponent));
