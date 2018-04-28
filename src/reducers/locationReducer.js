import {
  GET_LOCATION_BEGIN,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE
} from '../actions/locationAction';
// error:'',location:null,loadingLocation:false

export default function locationReducer(state = {error:'',location:null,loadingLocation:false}, action) {
  switch(action.type) {
    case GET_LOCATION_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loadingLocation: true,
        error: null
      };

    case GET_LOCATION_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loadingLocation: false,
        location: {latitude:action.payload.latitude, longitude:action.payload.longitude},
        error:''
      };

    case GET_LOCATION_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      console.log(action.payload);
      return {
        ...state,
        loadingLocation: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
}
