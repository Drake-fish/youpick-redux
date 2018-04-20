import { GET_PREFERENCES} from '../actionTypes';

export default function(state = {}, action){
  switch(action.type){
    case GET_PREFERENCES :
      return action.payload;
    default :
      return state;
  }
}
