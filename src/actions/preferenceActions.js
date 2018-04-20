import { GET_PREFERNCES, PREFERENCE_STATUS } from '../actionTypes';
import { database } from '../firebase';

export function getPreferences(){
  return dispatch => {
    //set the loader to true!!
    dispatch({
      type: PREFERENCE_STATUS,
      payload:true
    });
    //get the notes
    database.on('value', snapshot => {
      dispatch({
        type: GET_PREFERENCES,
        payload: snapshot.val()
      });
      //set the loader to false
      dispatch({
        type: PREFERENCE_STATUS,
        payload:false
      });
      //
    }, ()=> {
      //keep trying as status are changing
      dispatch({
        type: PREFERENCE_STATUS,
        payload: -1
      });
    });
  }
}

export function savePreference(preference){
  return dispatch => {
    database.push(preference);
  }
}
//find the child note and update with the new note.
export function editPreference(id, preference){
  return dispatch => database.child(id).update(preference);
}
export function deletePreference(id){
  return dispatch => database.child(id).remove();
}

// export function SaveComment(noteId, comment){
//   //find the id of the comment add comment and add that to the note.
//   return dispatch => database.child(noteId).child('comments').push(comment);
// }
