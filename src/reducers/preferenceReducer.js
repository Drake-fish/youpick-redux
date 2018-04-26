import { GET_PREFERENCES } from '../actionTypes';

const initialState = {}

export default function(state = {}, action){
  switch(action.type){
    case GET_PREFERENCES :
      return action.payload;
    default :
      return state;
  }
}
