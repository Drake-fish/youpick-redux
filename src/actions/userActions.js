import { auth, googleProvider, twitterProvider } from '../firebase';
import { GET_USER, USER_STATUS, GET_PREFERENCES, CLEAR_PREFERENCES } from '../actionTypes';
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
      let food = [{american:true},{mexican:true},{french:true},{bbq:true}, {Burgers:true}, {Cafes:true}, {Chicken:true}, {Chinese:true},{Pizza:true}, {Italian:true}, {Deli:true}, {Diners:true}, {German:true}, {Greek:true}, {Asian:true}, {Indian:true}, {Tacos:true}, {Salad:true}, {Soup:true}, {Spanish:true}, {Texmex:true}, {Steakhouse:true}, {Foodtrucks:true}];
      let play = [{Arcades:true}, {Bars:true}, {Bingo:true}, {'Book Stores':true}, {Bowling:true}, {Coffee:true}, {Escape:true}, {'Laser Tag':true}, {Movies:true},{Museums:true}, {Shopping:true}, {Spas:true}, {Trampolines:true}, {'Amusement Parks':true}, {Aquariums:true}, {Bikes:true}, {Breweries:true}, {Canoeing:true}, {'go carts':true}, {Kayak:true}, {Hiking:true}, {'Mini golf':true}, {Movies:true}, {'Paddle Boarding':true}, {'Paint ball':true}, {Tours:true}, {Swimming:true}, {Tubing:true}, {Ziplining:true},{Zoo:true}, {Wineries:true}];
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
  return dispatch => {
    auth.signOut();
    dispatch({
      type:CLEAR_PREFERENCES
    })
  }
}
