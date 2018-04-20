
import * as firebase from 'firebase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZd2iusYOi-ltxi7S1Jql44S4fsBkLZzA",
    authDomain: "youpick-9bc08.firebaseapp.com",
    databaseURL: "https://youpick-9bc08.firebaseio.com",
    projectId: "youpick-9bc08",
    storageBucket: "",
    messagingSenderId: "422332099548"
  };
  firebase.initializeApp(config);

  export const database = firebase.database().ref('/preferences');

  //regular authentication
  export const auth = firebase.auth();

  //google authentication
  export const googleProvider = new firebase.auth.GoogleAuthProvider()

  //twitter authentication
  export const twitterProvider = new firebase.auth.TwitterAuthProvider()
