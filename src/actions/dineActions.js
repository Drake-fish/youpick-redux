
import fetchJsonp from 'fetch-jsonp';
import { client_secret, client_id } from '../config';
export const FETCH_PRODUCTS_BEGIN= 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

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

export function fetchProducts(lat, long, term) {
  return dispatch => {
    dispatch({
      type: FETCH_PRODUCTS_BEGIN,
      payload:true
    });
    fetchJsonp(`https://api.foursquare.com/v2/venues/explore?ll=${long},${lat}&client_id=${client_id}&client_secret=${client_secret}&v=20180424&query=${term}&openNow=1&limit=1`)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json);
        dispatch({
          type:FETCH_PRODUCTS_SUCCESS,
          payload:json.response
        });

      }).catch(function(ex) {
        console.log('parsing failed', ex)
        dispatch({
          type:FETCH_PRODUCTS_FAILURE,
          payload:ex
        });
      })
    }

}
