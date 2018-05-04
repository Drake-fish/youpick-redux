import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CLEAR
} from '../actions/dineActions';


export default function productReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loadingResults: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loadingResults: false,
        items: action.payload.items.groups[0].items[0],
        query: action.payload.items.query,
        details:action.payload.details.venue
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loadingResults: false,
        error: action.payload,
      };
    case CLEAR :
    return {
      ...state,
      loadingResults:false,
      items:null,
      query:null,
      details:null
    }
    default:
      return state;
  }
}
