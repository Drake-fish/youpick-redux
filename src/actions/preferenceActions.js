import { GET_PREFERENCES, GET_PREFERENCES_STATUS } from '../actionTypes';
import { database } from '../firebase';

export function getPreferences(userID) {
	return dispatch => {
		//set the loader to true!!
		dispatch({
			type: GET_PREFERENCES_STATUS,
			payload: true
		});
		//get the preferences
		database.ref(`/youpick/users/${userID}/preferences`).on(
			'value',
			snapshot => {
				dispatch({
					type: GET_PREFERENCES,
					payload: snapshot.val()
				});
				//set the loader to false
				dispatch({
					type: GET_PREFERENCES_STATUS,
					payload: false
				});
				//
			},
			() => {
				//keep trying as status are changing
				dispatch({
					type: GET_PREFERENCES_STATUS,
					payload: -1
				});
			}
		);
	};
}

export function savePreference(userID, preference) {
	return dispatch => {
		database.ref(`/youpick/users/${userID}/preferences`).push(preference);
	};
}
export function editPreference(userID, preference, id, section) {
	return dispatch => {
		database
			.ref(`/youpick/users/${userID}/preferences/${section}/${id}`)
			.update(preference);
	};
}
export function deletePreference(id) {
	return dispatch => database.child(id).remove();
}
