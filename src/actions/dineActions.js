
import fetchJsonp from 'fetch-jsonp';
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

export function fetchProducts() {
  return dispatch => {
    dispatch({
      type: FETCH_PRODUCTS_BEGIN,
      payload:true
    });
    fetchJsonp('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=BFDZ2UKIEXJ3WD1E41DPJPUHQV41JTBD32KBOKEQTXZWNBFF&client_secret=SDOKZTKCJN0YKEQUQIDFM21DJIHFBPNA4T1TVOJ2PWUU2ZN4&v=20180424')
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
