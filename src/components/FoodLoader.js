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
    if(nextProps.items){
      this.props.history.push('/results');
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
    let loader;
    let thunder=(
      <svg className="thunder-cloud" viewBox="0 0 512 512">
        <path d="M400,64c-5.3,0-10.6,0.4-15.8,1.1C354.3,24.4,307.2,0,256,0s-98.3,24.4-128.2,65.1c-5.2-0.8-10.5-1.1-15.8-1.1
        C50.2,64,0,114.2,0,176s50.2,112,112,112c13.7,0,27.1-2.5,39.7-7.3c12.3,10.7,26.2,19,40.9,25.4l24.9-24.9
        c-23.5-7.6-44.2-21.3-59.6-39.9c-13,9.2-28.8,14.7-45.9,14.7c-44.2,0-80-35.8-80-80s35.8-80,80-80c10.8,0,21.1,2.2,30.4,6.1
        C163.7,60.7,206.3,32,256,32s92.3,28.7,113.5,70.1c9.4-3.9,19.7-6.1,30.5-6.1c44.2,0,80,35.8,80,80s-35.8,80-80,80
        c-17.1,0-32.9-5.5-45.9-14.7c-10.4,12.5-23.3,22.7-37.6,30.6L303,312.2c20.9-6.6,40.5-16.9,57.3-31.6c12.6,4.8,26,7.3,39.7,7.3
        c61.8,0,112-50.2,112-112S461.8,64,400,64z" />
        <polygon className="bolt" points="192,352 224,384 192,480 288,384 256,352 288,256 " />
      </svg>
    );
    return (
      <div className="App">
        {loader}
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
