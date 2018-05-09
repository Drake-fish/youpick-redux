import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/result.css';
import { Link } from 'react-router-dom';
import { clearResults } from '../actions/dineActions';
import { fetchProducts, selectTerm } from '../actions/dineActions';
import { openMap, openContact, openLikes } from '../actions/resultActions';
import PlayLoader from './PlayLoader';
import _ from 'underscore';
import Result from './Result';

class ResultsPage extends Component {
  constructor(props){
    super(props);
    this.state={ usedTerms:[] }
  }
  componentWillMount(){

    const { location, loadingLocation, loadingResults, history } = this.props;
    console.log(history);
    //IF we have the users location, let's go ahead and make our selection.
    if(location){
      let usedTerms=[];
      this.selections(location.longitude, location.latitude, usedTerms);
    }else if(!loadingLocation && !loadingResults && !location){
      history.push('/');
    }
  }
  componentDidUpdate(prevProps, prevState){
    //when we get the users location let's call for the result
    const { location } = this.props;
    let usedTerms=[];
    if(prevProps.location !==  location){
      this.selections(location.longitude, location.latitude, usedTerms);
    }
  }
  loadNext = () =>{
    const { history, location, dine } = this.props;
    const { usedTerms } = this.state;
    let newTerms=usedTerms.concat(dine.query);
    console.log('newTerms', newTerms);
    this.setState({
      usedTerms:newTerms
    });
  //if we are coming from the search page, let's push the user back home.
    if(history.location.pathname.split('/')[2]){
      history.push('/');
    }else{
      this.selections(location.longitude, location.latitude, newTerms);
    }
  }
  selections = (lat,long, usedTerms) => {
    const { fetchProducts, preferences, selectTerm, history } = this.props;
    let term = selectTerm(preferences,history.location.pathname.split('/')[1],usedTerms);
    let search=history.location.pathname.split('/')[2];
    if(term && !search){
      fetchProducts(lat,long,term);
    }else{
      fetchProducts(lat,long,search);
    }
  }
  render() {
    const { result, mapOpen, contactOpen, details, location, loadingResults, loadingLocation, dine, history, openMap, openContact, openLikes } = this.props;
    let results;
    if(loadingLocation){
      results=(
        <PlayLoader message='Loading Location'/>
      );
    }else if(loadingResults){
      results=(
        <PlayLoader message='Searching for something awesome!'/>
      );
    }else if(result && dine.error === null){
      results=<Result mapOpen={mapOpen} contactOpen={contactOpen} toggleMap={openMap} toggleLikes={openLikes} toggleContact={openContact} location={location} details={details} result={result} loadNext={this.loadNext}/>
    }else if(dine.error !== null){
      results=(
        <div className="out-container">
          <Link to="/"><i className="far fa-times-circle"></i></Link>
          <h2>OOPS!</h2>
          <h2>{dine.error}</h2>
          <h2>Why not customize your </h2>
          <Link to="/preferences"><span><i className="fas fa-cog"></i>Preferences?</span></Link>
        </div>
      );
    }


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
  return {
    dine:state.dine,
    result:state.dine.query,
    loadingResults:state.dine.loadingResults,
    details:state.dine.details,
    preferences:state.preferences,
    items:state.dine.items,
    location:state.location.location,
    loadingLocation:state.location.loadingLocation,
    mapOpen:state.results.mapOpen,
    contactOpen:state.results.contactOpen

  }
}

export default connect(mapStateToProps, { clearResults, fetchProducts, selectTerm, openMap, openContact, openLikes })(ResultsPage);
