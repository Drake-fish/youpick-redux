import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/result.css';
import { clearResults } from '../actions/dineActions';
import { fetchProducts, selectTerm } from '../actions/dineActions';
import PlayLoader from './PlayLoader';
import _ from 'underscore';
import Result from './Result';

class ResultsPage extends Component {
  componentWillMount(){

    const { location, loadingLocation, loadingResults, details, history } = this.props;
    console.log(history);
    //IF we have the users location, let's go ahead and make our selection.
    if(location){
      this.selections(location.longitude, location.latitude);
    }
  }
  componentDidUpdate(prevProps, prevState){
    //when we get the users location let's call for the food
    if(prevProps.location !==  this.props.location){
      this.selections(this.props.location.longitude, this.props.location.latitude);
    }
  }
  loadNext = () =>{
    this.selections(this.props.location.longitude, this.props.location.latitude);
  }
  selections = (lat,long) => {
    const { fetchProducts, preferences, selectTerm, history } = this.props;
    let term = selectTerm(preferences,history.location.pathname.split('/')[1]);
    if(term){
      fetchProducts(lat,long,term);
    }
  }
  render() {
    const { result, details, location, loadingResults, loadingLocation } = this.props;
    let results;

    if(!details && !location){
      results=(
        <PlayLoader/>
      );
    }else if(location && !details){
      results=(
        <PlayLoader/>
      );
    }else if(location && details){
      results=<Result details={details} result={result} loadNext={this.loadNext}/>
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
    preferences:state.preferences,
    items:state.dine.items,
    location:state.location.location,
    loadingLocation:state.location.loadingLocation

  }
}

export default connect(mapStateToProps, { clearResults, fetchProducts, selectTerm })(ResultsPage);
