import {
	GET_LOCATION_BEGIN,
	GET_LOCATION_SUCCESS,
	GET_LOCATION_FAILURE,
	GET_LOCATION
} from '../actionTypes';

export const getLocationBegin = () => ({
	type: GET_LOCATION_BEGIN
});

export const getLocationSuccess = location => ({
	type: GET_LOCATION_SUCCESS,
	payload: { location }
});

export const getLocationError = error => ({
	type: GET_LOCATION_FAILURE,
	payload: { error }
});

export function getLocation() {
	return dispatch => {
		dispatch({
			type: GET_LOCATION_BEGIN,
			payload: true
		});

		function success(pos) {
			var crd = pos.coords;
			dispatch({
				type: GET_LOCATION_SUCCESS,
				payload: { latitude: crd.latitude, longitude: crd.longitude }
			});
		}

		function error(err) {
			dispatch({
				type: GET_LOCATION_FAILURE,
				payload: err
			});
		}
		navigator.geolocation.getCurrentPosition(success, error);
	};
}
