import {
	FETCH_PRODUCTS_BEGIN,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
	CLEAR,
	OUT
} from '../actionTypes';

let initialState = {
	details: null,
	error: null,
	items: null,
	loadingResults: false,
	query: null
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_PRODUCTS_BEGIN:
			return {
				...state,
				loadingResults: true,
				error: null
			};

		case FETCH_PRODUCTS_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				loadingResults: false,
				items: action.payload.items.groups[0].items[0],
				query: action.payload.items.query,
				details: action.payload.details.venue
			};
		case FETCH_PRODUCTS_FAILURE:
			return {
				...state,
				loadingResults: false,
				error: action.payload
			};
		case CLEAR:
			return {
				...state
			};
		case OUT:
			return {
				...state,
				query: 'no mas!',
				error: 'OUT OF PREFERENCES'
			};
		default:
			return state;
	}
}
