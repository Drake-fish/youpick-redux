import React, { Component } from 'react';
import { connect } from 'react-redux';
// with withRouter You can get access to the history object’s properties
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userActions';


class LoadingComponent extends Component {
    componentWillMount() {
        const { userLoading } = this.props;
        // if we havent tried to load the user, load user
        if (userLoading === undefined) {
            this.props.getUser();
        }
    }

    render() {
        const { userLoading,  children } = this.props;
        /**
         * throughout the lifetime of app user and notes loading status will
         * keep toggling between true and false
         * when anything other than that toggling state such as true or false is in the state
         * that means the loading operation is setteled and not active
         * that time, show the enclosing components
         * for everything else and inbetween show Loading
         */
        if (!userLoading || this.props.user === null) {
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
