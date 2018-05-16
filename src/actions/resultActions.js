import { OPEN_MAP, OPEN_CONTACT, OPEN_INFO } from '../actionTypes';

export function openMap() {
	return dispatch => {
		dispatch({
			type: OPEN_MAP
		});
	};
}
export function openContact() {
	return dispatch => {
		dispatch({
			type: OPEN_CONTACT
		});
	};
}
export function openInfo() {
	return dispatch => {
		dispatch({
			type: OPEN_INFO
		});
	};
}
