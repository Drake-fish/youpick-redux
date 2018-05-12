import { USER_STATUS, GET_PREFERENCES_STATUS } from '../actionTypes';

export default function(state = {}, action){
  switch(action.type){
    case GET_PREFERENCES_STATUS :
      return {...state, preferences: action.payload};
    case USER_STATUS :
      return {...state, user: action.payload};
    default :
      return state;
  }
}
