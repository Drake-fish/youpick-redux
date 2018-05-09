import { OPEN_MAP, OPEN_CONTACT, OPEN_LIKES } from '../actionTypes';

let initialState= {
  mapOpen:true,
  contactOpen:false,
  likes:false
}
export default function(state = initialState, action){
  switch(action.type){
    case OPEN_MAP :
    console.log('opening-map');
    return {...state, mapOpen:true, contactOpen:false, likes:false};
    case OPEN_CONTACT :
      return {...state, mapOpen:false, contactOpen:true, likes:false};
    case OPEN_LIKES :
    return {...state, mapOpen:false, contactOpen:false, likes:true}
    default :
      return state;
  }
}
