import { GET_PREFERENCES, CLEAR_PREFERENCES } from '../actionTypes';

export default function(state = {}, action){
  switch(action.type){
    case GET_PREFERENCES :
      return action.payload
    case CLEAR_PREFERENCES :
      return null
    default :
      return state;
  }
}
