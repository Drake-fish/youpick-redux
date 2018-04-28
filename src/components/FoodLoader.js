import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/dineActions';
import _ from 'underscore';

class FoodLoader extends Component {
  //when the component mounted is there already a location? fetch products if there is.
  componentWillMount(){
    //IF we have the users location, let's go ahead and make our selection.
    if(this.props.location){
      console.log("LOCATION AT MOUNT",this.props.location);
      this.selections(this.props.location.latitude, this.props.location.longitude);
    }
  }
  componentWillReceiveProps(nextProps){
    const { fetchProducts, preferences } = this.props;
    //when we get the users location let's call for the food
    if(nextProps.location !== null){
      console.log("LOcation inside the component will recieve props", nextProps.location)
      this.selections(nextProps.location.longitude, nextProps.location.latitude);
    }

    //when the items get returned let's push the user to the results
    if(nextProps.items){
      this.props.history.push(`/results`);
    }
  }
  selections = (lat,long) => {
    const { fetchProducts, preferences, location } = this.props;
    let foodSelections;
    //if there are no preferences we will give the user preferences and select a random one.
    if(!preferences){
      foodSelections=_.first(_.shuffle(['american','mexican','french']));
      console.log("food Selection WITH NO Preferences", foodSelections, this.props);
      fetchProducts(lat,long,foodSelections);
    //if they do have preferences we will loop through those and select only the True values and select a random one.
    }else{
      let selections=[];
      foodSelections=_.mapObject(preferences.food, (food,status) => {
        if(_.values(food)){
          selections.push(_.keys(food));
        }
      });
      console.log("THIS PROPS AT FOOD LOADER", this.props);
      let finalSelection = _.first(_.shuffle(selections))[0];
      console.log("FINAL SELECTION", finalSelection)
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
