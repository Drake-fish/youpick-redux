import { auth, googleProvider, twitterProvider } from '../firebase';
import { GET_USER, USER_STATUS } from '../actionTypes';
import { GET_PREFERENCES } from '../actionTypes';
import { database } from '../firebase';

export function googleLogin(){
  return dispatch => auth.signInWithPopup(googleProvider)
}

export function twitterLogin(){
  return dispatch => auth.signInWithPopup(twitterProvider)
}
export function registerEmail(email, password){
  return dispatch => {
    auth.createUserWithEmailAndPassword(email, password);
  }
}
export function loginEmail(email, password){
  return dispatch => auth.signInWithEmailAndPassword(email, password)
}
export function getUser(){
  return dispatch =>{
    //show loading status before getting user to true
    dispatch({
      type: USER_STATUS,
      payload:true
    });
    auth.onAuthStateChanged(user => {
      let userID;
      if(user != null){
        userID=user.uid;
      }
      let food = [{american:true},{mexican:true},{french:true}];
      let play = [{bowling: true}, {arcade:true}, {poop:true}];
      database.ref(`/youpick/users/${userID}/preferences`).on('value', snapshot => {

        //if the user does not have stock preferences let's add them
        if(!snapshot.val()){
          food.forEach((preference)=>{
            database.ref(`/youpick/users/${userID}/preferences/food`).push(preference);
          });
          play.forEach((preference)=>{
            database.ref(`/youpick/users/${userID}/preferences/play`).push(preference);
          });

        //if we do have preferences let's return them!
        }else{
          console.log(snapshot.val());
          dispatch({type:GET_PREFERENCES, payload:snapshot.val()});
        }
      });
      console.log('user changed', user);
      // database.ref(`/youpick/users/`).child(user.uid).once('value', function(snapshot) {
      //   if (snapshot.exists()) {
      //     alert('exists');
      //   }
      // });
      dispatch({
        type:GET_USER,
        payload:user
      });
      //set the loader to false
      dispatch({
        type: USER_STATUS,
        payload:false
      });
    });
  }
}

export function logout(){
  return dispatch => auth.signOut();
}
