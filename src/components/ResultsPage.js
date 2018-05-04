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
    let search=history.location.pathname.split('/')[2];
    if(term && !search){
      fetchProducts(lat,long,term);
    }else{
      fetchProducts(lat,long,search);
    }
  }
  render() {
    const { result, details, location, loadingResults, loadingLocation, dine, history } = this.props;
    let results;

    if(!details && !location){
      results=(
        <PlayLoader message='Loading Location'/>
      );
    }else if(location && !details && dine.loadingResults){
      results=(
        <PlayLoader message='Searching for something awesome!'/>
      );
    }else if(location && details && !dine.loadingResults){
      results=<Result details={details} result={result} loadNext={this.loadNext}/>
    }else if(location && dine.error === 'error'){
      results=<div>NO RESULTS</div>
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
    dine:state.dine,
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
