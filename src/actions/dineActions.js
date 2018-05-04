import fetchJsonp from 'fetch-jsonp';
import { client_secret, client_id } from '../config';
import _ from 'underscore';


export const FETCH_PRODUCTS_BEGIN= 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const CLEAR = 'CLEAR';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsError = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});
export const clearResults = () => ({
  type:CLEAR
});

export function fetchProducts(lat, long, term) {
  return dispatch => {
    dispatch({
      type: FETCH_PRODUCTS_BEGIN,
      payload:true
    });
    console.log("GETTING PRODUCTS HERE", lat, long, term);
    fetchJsonp(`https://api.foursquare.com/v2/venues/explore?ll=${long},${lat}&client_id=${client_id}&client_secret=${client_secret}&v=20180424&query=${term}&openNow=1&limit=1`)
      .then(function(response) {
        console.log(response,'response from first clal');
        return response.json()
      }).then(function(json) {
          var venueDetails;
          var items = json.response;
          console.log('response to frist call',json.response);
            if(_.isEmpty(json.response)){
              dispatch({
                type:FETCH_PRODUCTS_FAILURE,
                payload:'error'
              });
            }else{
              fetchJsonp(`https://api.foursquare.com/v2/venues/${json.response.groups[0].items[0].venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=20180424`)
              .then(function(response) {
                return response.json()
              })
              .then(function(json) {
                venueDetails=json.response;
                dispatch({
                  type:FETCH_PRODUCTS_SUCCESS,
                  payload:{items:items, details:json.response}
                });
              }).catch(function(ex){
                console.log("FAILED", ex);
              })
            }
          }).catch(function(ex) {
        console.log('parsing failed', ex)
        dispatch({
          type:FETCH_PRODUCTS_FAILURE,
          payload:ex
        });
      })
    }

}

export function selectTerm(pref,forWhat){
  console.log(forWhat);
  return dispatch => {
    switch(forWhat){
      case 'food':
      let foodSelection;
      if(_.isEmpty(pref)){
        foodSelection=_.first(_.shuffle(['American', 'BBQ', 'Burgers', 'Cafes', 'Chicken', 'Mexican', 'Chinese', 'Pizza', 'Italian', 'Deli', 'Diners', 'French', 'German', 'Greek', 'Asian', 'Indian', 'Tacos', 'Salad', 'Soup', 'Spanish', 'Texmex', 'Steakhouse', 'Foodtrucks']));
        return foodSelection;
      //if they do have preferences we will loop through those and select only the True values and select a random one.
      }else{
        let selections=[];
        foodSelection=_.mapObject(pref.food, (opt,status) => {
          if(_.values(opt)[0]){
            selections.push(_.keys(opt));
          }
        });
        let finalSelection = _.first(_.shuffle(selections))[0];
        return finalSelection
      }
      case 'play' :
      let playSelection;
      //if there are no preferences we will give the user preferences and select a random one.
      if(_.isEmpty(pref)){
        playSelection=_.first(_.shuffle(['Arcades', 'Bars', 'Bingo', 'BookStores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Amusement', 'Aquariums', 'BikeRentals', 'Breweries', 'Canoeing', 'GoKarts', 'Kayaking', 'Hiking', 'Minigolf', 'Movies', 'PaddleBoarding', 'Paintball', 'Tours', 'Swimming', 'Tubing', 'Ziplining', 'Zoos', 'Wineries', ]));
        return playSelection
      //if they do have preferences we will loop through those and select only the True values and select a random one.
      }else{
        let selections=[];
        playSelection=_.mapObject(pref.play, (opt,status) => {
          if(_.values(opt)[0]){
            selections.push(_.keys(opt));
          }
        });
        let finalSelection = _.first(_.shuffle(selections))[0];
        return finalSelection
        }
      }
    }
  }
