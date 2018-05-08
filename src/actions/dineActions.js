import fetchJsonp from 'fetch-jsonp';
import { client_secret, client_id } from '../config';
import _ from 'underscore';


export const FETCH_PRODUCTS_BEGIN= 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const CLEAR = 'CLEAR';
export const OUT = 'OUT';

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
export const outOfResults= () => ({
  type:OUT
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
                payload:'empty'
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

export function selectTerm(pref,forWhat,usedTerms){
  return dispatch => {
    switch(forWhat){
      case 'food':
        let foodSelection=['american', 'bbq', 'burgers', 'cafes', 'chicken', 'mexican', 'chinese', 'pizza', 'italian', 'deli', 'diners', 'french', 'german', 'greek', 'asian', 'indian', 'tacos', 'salad', 'soup', 'spanish', 'texmex', 'steakhouse', 'foodtrucks'];
        if(_.isEmpty(pref)){
          if(usedTerms.length > 0){
          let filteredArray = foodSelection.filter(val => !usedTerms.includes(val));
            if(filteredArray.length>0){
              foodSelection=_.first(_.shuffle(filteredArray));
              return foodSelection;
            }else{
              dispatch({
                type:OUT
              });
            }
          }else{
            foodSelection=_.first(_.shuffle(foodSelection));
            return foodSelection;
          }






        //if they do have preferences we will loop through those and select only the True values and select a random one.
        }else{
          //create a container to push values to
          let selections=[];
          //map object and push options that are true to the selections cotnainer
          foodSelection=_.mapObject(pref.food, (opt,status) => {
            if(_.values(opt)[0]){
              selections.push(_.keys(opt));
            }
          });
          //the array that is returned in the previous function is an array of arrays. Let's flatten it down to strings
          var flattenedArray = [].concat.apply([], selections);
          //the strings are mixed upper case and lower case. Let's make them all lower case.
            flattenedArray=flattenedArray.map((term) => {
              return term.toLowerCase();
            });
            //if there are usedTerms passed to this function, let's remove them and select based on the terms that are left
            if(usedTerms.length > 0){
            //filter the usedTerms out.
            let filteredArray = flattenedArray.filter(val => !usedTerms.includes(val));
            //if we still have options left to search with let's return one of those.
              if(filteredArray.length>0){
                filteredArray=_.first(_.shuffle(filteredArray));
                return filteredArray;
            //if we are out of terms to search return an error
              }else{
                dispatch({
                  type:OUT
                });
              }
            //if we do not have an unused terms let's just search all the terms.
            }else{
              flattenedArray=_.first(_.shuffle(flattenedArray));
              return flattenedArray;
            }
        }



      break;
      case 'play' :

      let playSelection=['Arcades', 'Bars', 'Bingo', 'BookStores', 'Bowling', 'Coffee', 'Escape Rooms', 'Laser Tag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Amusement Parks', 'Aquariums', 'Bike Rentals', 'Breweries', 'Canoeing', 'Go Karts', 'Kayaking', 'Hiking', 'Mini golf', 'Movies', 'Paddle Boarding', 'Paint ball', 'Tours', 'Swimming', 'Tubing', 'Ziplining', 'Zoos', 'Wineries'];
      if(_.isEmpty(pref)){
        if(usedTerms.length > 0){
        let filteredArray = playSelection.filter(val => !usedTerms.includes(val));
          if(filteredArray.length>0){
            playSelection=_.first(_.shuffle(filteredArray));
            return playSelection;
          }else{
            dispatch({
              type:OUT
            });
          }
        }else{
          playSelection=_.first(_.shuffle(playSelection));
          return playSelection;
        }






      //if they do have preferences we will loop through those and select only the True values and select a random one.
      }else{
        //create a container to push values to
        let selections=[];
        //map object and push options that are true to the selections cotnainer
        playSelection=_.mapObject(pref.play, (opt,status) => {
          if(_.values(opt)[0]){
            selections.push(_.keys(opt));
          }
        });
        //the array that is returned in the previous function is an array of arrays. Let's flatten it down to strings
        var flattenedArray = [].concat.apply([], selections);
        //the strings are mixed upper case and lower case. Let's make them all lower case.
          flattenedArray=flattenedArray.map((term) => {
            return term.toLowerCase();
          });
          //if there are usedTerms passed to this function, let's remove them and select based on the terms that are left
          if(usedTerms.length > 0){
          //filter the usedTerms out.
          let filteredArray = flattenedArray.filter(val => !usedTerms.includes(val));
          //if we still have options left to search with let's return one of those.
            if(filteredArray.length>0){
              filteredArray=_.first(_.shuffle(filteredArray));
              return filteredArray;
          //if we are out of terms to search return an error
            }else{
              dispatch({
                type:OUT
              });
            }
          //if we do not have an unused terms let's just search all the terms.
          }else{
            flattenedArray=_.first(_.shuffle(flattenedArray));
            return flattenedArray;
          }
      }
      break;
    }
  }
}
