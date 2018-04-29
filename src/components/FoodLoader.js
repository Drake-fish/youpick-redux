import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/dineActions';
import _ from 'underscore';

class FoodLoader extends Component {
  //when the component mounted is there already a location? fetch products if there is.
  componentWillMount(){
    //IF we have the users location, let's go ahead and make our selection.
    if(this.props.location){
      this.selections(this.props.location.longitude, this.props.location.latitude);
    }
  }
  componentWillReceiveProps(nextProps){
    //when we get the users location let's call for the food
    if(nextProps.location !== null){
      this.selections(nextProps.location.longitude, nextProps.location.latitude);
    }

    //when the items get returned let's push the user to the results
    if(nextProps.items){
      this.props.history.push(`/results`);
    }
  }
  selections = (lat,long) => {
    const { fetchProducts, preferences } = this.props;
    let foodSelections;
    //if there are no preferences we will give the user preferences and select a random one.
    if(!preferences){
      foodSelections=_.first(_.shuffle(['american','mexican','french']));
      fetchProducts(lat,long,foodSelections);
    //if they do have preferences we will loop through those and select only the True values and select a random one.
    }else{
      let selections=[];
      foodSelections=_.mapObject(preferences.food, (food,status) => {
        if(_.values(food)[0]){
          selections.push(_.keys(food));
        }
      });
      let finalSelection = _.first(_.shuffle(selections))[0];
      fetchProducts(lat,long,finalSelection);
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <h1>LOADING FOOD FOOD!!</h1>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  console.log("STATE AT PROPS",state);
  return {
    preferences:state.preferences,
    items:state.dine.items,
    location:state.location.location,
  }
}

export default connect(mapStateToProps, { fetchProducts })(FoodLoader);
