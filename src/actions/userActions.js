import { auth, googleProvider, twitterProvider } from '../firebase';
import {
	GET_USER,
	USER_STATUS,
	GET_PREFERENCES,
	CLEAR_PREFERENCES
} from '../actionTypes';
import { database } from '../firebase';

export function googleLogin() {
	return dispatch => auth.signInWithPopup(googleProvider);
}

export function twitterLogin() {
	return dispatch => auth.signInWithPopup(twitterProvider);
}
export function registerEmail(email, password) {
	return dispatch => {
		auth.createUserWithEmailAndPassword(email, password);
	};
}
export function loginEmail(email, password) {
	return dispatch => auth.signInWithEmailAndPassword(email, password);
}
export function getUser() {
	return dispatch => {
		//show loading status before getting user to true
		dispatch({
			type: USER_STATUS,
			payload: true
		});
		auth.onAuthStateChanged(user => {
			let userID;
			if (user != null) {
				userID = user.uid;
			}
			let food = [
				{ american: true },
				{ Asian: true },
				{ bbq: true },
				{ Burgers: true },
				{ Cafes: true },
				{ Chicken: true },
				{ Chinese: true },
				{ Deli: true },
				{ Diners: true },
				{ Foodtrucks: true },
				{ french: true },
				{ German: true },
				{ Greek: true },
				{ Indian: true },
				{ Italian: true },
				{ mexican: true },
				{ Pizza: true },
				{ Salad: true },
				{ Soup: true },
				{ Spanish: true },
				{ Steakhouse: true },
				{ Tacos: true },
				{ Texmex: true }
			];
			let play = [
				{ Arcades: true },
				{ 'Amusement Parks': true },
				{ Aquariums: true },
				{ Bars: true },
				{ Bikes: true },
				{ Bingo: true },
				{ 'Book Stores': true },
				{ Bowling: true },
				{ Breweries: true },
				{ Canoeing: true },
				{ Coffee: true },
				{ Escape: true },
				{ 'go karts': true },
				{ Hiking: true },
				{ Kayak: true },
				{ 'Laser Tag': true },
				{ 'Mini golf': true },
				{ Movies: true },
				{ Museums: true },
				{ 'Paddle Boarding': true },
				{ 'Paint ball': true },
				{ Shopping: true },
				{ Spas: true },
				{ Trampolines: true },
				{ Tours: true },
				{ Swimming: true },
				{ Tubing: true },
				{ Wineries: true },
				{ Ziplining: true },
				{ Zoo: true }
			];
			database
				.ref(`/youpick/users/${userID}/preferences`)
				.on('value', snapshot => {
					//if the user does not have stock preferences let's add them
					if (!snapshot.val()) {
						food.forEach(preference => {
							database
								.ref(`/youpick/users/${userID}/preferences/food`)
								.push(preference);
						});
						play.forEach(preference => {
							database
								.ref(`/youpick/users/${userID}/preferences/play`)
								.push(preference);
						});

						//if we do have preferences let's return them!
					} else {
						console.log(snapshot.val());
						dispatch({ type: GET_PREFERENCES, payload: snapshot.val() });
					}
				});
			console.log('user changed', user);
			dispatch({
				type: GET_USER,
				payload: user
			});
			//set the loader to false
			dispatch({
				type: USER_STATUS,
				payload: false
			});
		});
	};
}

export function logout() {
	return dispatch => {
		auth.signOut();
		dispatch({
			type: CLEAR_PREFERENCES
		});
	};
}
