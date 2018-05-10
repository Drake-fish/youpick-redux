import { OPEN_MAP, OPEN_CONTACT, OPEN_INFO } from '../actionTypes';

let initialState= {
  mapOpen:false,
  contactOpen:false,
  info:true
}
export default function(state = initialState, action){
  switch(action.type){
    case OPEN_MAP :
    console.log('opening-map');
    return {...state, mapOpen:true, contactOpen:false, info:false};
    case OPEN_CONTACT :
      return {...state, mapOpen:false, contactOpen:true, info:false};
    case OPEN_INFO :
    return {...state, mapOpen:false, contactOpen:false, info:true}
    default :
      return state;
  }
}
