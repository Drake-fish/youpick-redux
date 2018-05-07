import { OPEN_MAP, OPEN_CONTACT, OPEN_LIKES } from '../actionTypes';


export function openMap() {
  return dispatch => {
    dispatch({
      type:OPEN_MAP
    });
  }
}
    export function openContact() {
      return dispatch => {
        dispatch({
          type:OPEN_CONTACT
        });
      }
    }
    export function openLikes() {
      return dispatch => {
        dispatch({
          type:OPEN_LIKES
        });
      }
    }
