import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/result.css';
import { clearResults } from '../actions/dineActions';
import { fetchProducts } from '../actions/dineActions';
import PlayLoader from './PlayLoader';
import Result from './Result';
import _ from 'underscore';

class PlayResultsPage extends Component {
  componentWillMount(){
    const { location, loadingLocation, loadingResults, details, history } = this.props;
    //IF we have the users location, let's go ahead and make our selection.
    if(location){
      this.selections(location.longitude, location.latitude);
    }
    if(!loadingLocation && !loadingResults && !details){
      history.push('/');
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
    const { fetchProducts, preferences } = this.props;
    let foodSelections;
    //if there are no preferences we will give the user preferences and select a random one.
    if(!preferences){
      foodSelections=_.first(_.shuffle(['Arcades', 'Bars', 'Bingo', 'BookStores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Amusement', 'Aquariums', 'BikeRentals', 'Breweries', 'Canoeing', 'GoKarts', 'Kayaking', 'Hiking', 'Minigolf', 'Movies', 'PaddleBoarding', 'Paintball', 'Tours', 'Swimming', 'Tubing', 'Ziplining', 'Zoos', 'Wineries', ]));
      fetchProducts(lat,long,foodSelections);
    //if they do have preferences we will loop through those and select only the True values and select a random one.
    }else{
      let selections=[];
      foodSelections=_.mapObject(preferences.play, (food,status) => {
        if(_.values(food)[0]){
          selections.push(_.keys(food));
        }
      });
      let finalSelection = _.first(_.shuffle(selections))[0];
      fetchProducts(lat,long,finalSelection);
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
    console.log("UNMOUNTING COMPONETN CLEARING SHIT");
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

export default connect(mapStateToProps, { clearResults, fetchProducts })(PlayResultsPage);
