import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/result.css';
import { clearResults } from '../actions/dineActions';
import { fetchProducts } from '../actions/dineActions';
import PlayLoader from './PlayLoader';
import _ from 'underscore';
import Result from './Result';

class SearchResultsPage extends Component {
  componentWillMount(){

    const { location, loadingLocation, loadingResults, details, history, error, fetchProducts } = this.props;
    //IF we have the users location, let's go ahead and make our selection.
    if(location){
      fetchProducts(location.latitude, location.longitude,this.props.history.location.pathname.split('/')[2]);
    }
  }
  componentDidUpdate(prevProps, prevState){
    const { location, fetchProducts, history } = this.props;
    //when we get the users location let's call for the food
    if(prevProps.location !==  location){
      fetchProducts(location.latitude, location.longitude,history.location.pathname.split('/')[2]);
    }
  }
  loadNext = () => {
    this.props.history.push('/');
  }

  render() {
    const { result, details, location, loadingResults, loadingLocation, error } = this.props;
    let results;

    if(!details && !location){
      results=(
        <PlayLoader/>
      );
    }else if(location && !details && loadingResults){
      results=(
        <PlayLoader/>
      );
    }else if(location && details && !loadingResults){
      results=<Result details={details} result={result} loadNext={this.loadNext}/>
    }else if(location && error === 'error' && !loadingResults){
      results= (
        <div className="error">
          <h3>We Didnt Find anything for that Search!</h3>
          <span>Try Again</span>
        </div>

      );
    }
    console.log("RESULTS", this.props.result, "DETAILS", this.props.details);


    return (
      <div className="result">
        {results}
      </div>
    );
  }
  componentWillUnmount(){
    this.props.clearResults();
  }
}
function mapStateToProps(state, ownProps){
  console.log("STate at results page", state);
  return {
    result:state.dine.query,
    loadingResults:state.dine.loadingResults,
    details:state.dine.details,
    error:state.dine.error,
    preferences:state.preferences,
    items:state.dine.items,
    location:state.location.location,
    loadingLocation:state.location.loadingLocation

  }
}

export default connect(mapStateToProps, { clearResults, fetchProducts })(SearchResultsPage);
