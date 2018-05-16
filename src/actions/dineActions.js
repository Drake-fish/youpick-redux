import fetchJsonp from 'fetch-jsonp';
import { client_secret, client_id } from '../config';
import _ from 'underscore';
import {
	FETCH_PRODUCTS_BEGIN,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
	CLEAR,
	OUT
} from '../actionTypes';

export const fetchProductsBegin = () => ({
	type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
	type: FETCH_PRODUCTS_SUCCESS,
	payload: { products }
});

export const fetchProductsError = error => ({
	type: FETCH_PRODUCTS_FAILURE,
	payload: { error }
});
export const clearResults = () => ({
	type: CLEAR
});
export const outOfResults = () => ({
	type: OUT
});

export function fetchProducts(lat, long, term) {
	return dispatch => {
		dispatch({
			type: FETCH_PRODUCTS_BEGIN,
			payload: true
		});
		fetchJsonp(
			`https://api.foursquare.com/v2/venues/explore?ll=${long},${lat}&client_id=${client_id}&client_secret=${client_secret}&v=20180424&query=${term}&openNow=1&limit=1`
		)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				var venueDetails;
				var items = json.response;
				if (_.isEmpty(json.response)) {
					dispatch({
						type: FETCH_PRODUCTS_FAILURE,
						payload: `empty`
					});
				} else {
					fetchJsonp(
						`https://api.foursquare.com/v2/venues/${
							json.response.groups[0].items[0].venue.id
						}?client_id=${client_id}&client_secret=${client_secret}&v=20180424`
					)
						.then(function(response) {
							return response.json();
						})
						.then(function(json) {
							venueDetails = json.response;
							dispatch({
								type: FETCH_PRODUCTS_SUCCESS,
								payload: { items: items, details: json.response }
							});
						})
						.catch(function(ex) {});
				}
			})
			.catch(function(ex) {
				dispatch({
					type: FETCH_PRODUCTS_FAILURE,
					payload: `Didnt find anything for ${term}`
				});
			});
	};
}

export function selectTerm(pref, forWhat, usedTerms) {
	return dispatch => {
		function selection(pref, selections, which, usedTerms) {
			if (_.isEmpty(pref)) {
				let selection;
				if (usedTerms.length > 0) {
					let filteredArray = selections.filter(
						val => !usedTerms.includes(val)
					);
					console.log('FILTERED ARRAY', filteredArray);
					if (filteredArray.length > 0) {
						selection = _.first(_.shuffle(filteredArray));
						return selection;
					} else {
						console.log('no more choices');
						dispatch({
							type: OUT
						});
					}
				} else {
					selection = _.first(_.shuffle(selections));
					return selection;
				}
				//if they do have preferences we will loop through those and select only the True values and select a random one.
			} else {
				//create a container to push values to
				let valArray = [];
				//map object and push options that are true to the selections cotnainer
				_.mapObject(pref[which], (opt, status) => {
					if (_.values(opt)[0]) {
						valArray.push(_.keys(opt)[0]);
					}
				});
				//the strings are mixed upper case and lower case. Let's make them all lower case.
				let lowerCaseArray = valArray.map(term => {
					return term.toLowerCase();
				});
				//if there are usedTerms passed to this function, let's remove them and select based on the terms that are left
				if (usedTerms.length > 0) {
					//filter the usedTerms out.
					let filteredArray = lowerCaseArray.filter(
						val => !usedTerms.includes(val)
					);
					console.log('FILTERERED ARRAY', filteredArray);
					//if we still have options left to search with let's return one of those.
					if (filteredArray.length > 0) {
						let finalSelection = _.first(_.shuffle(filteredArray));
						return finalSelection;
						//if we are out of terms to search return an error
					} else {
						dispatch({
							type: OUT
						});
					}
					//if we do not have an unused terms let's just search all the terms.
				} else {
					let finalSelection = _.first(_.shuffle(lowerCaseArray));
					return finalSelection;
				}
			}
		}
		switch (forWhat) {
			case 'food':
				let foodSelection = [
					'american',
					'bbq',
					'burgers',
					'cafes',
					'chicken',
					'mexican',
					'chinese',
					'pizza',
					'italian',
					'deli',
					'diners',
					'french',
					'german',
					'greek',
					'asian',
					'indian',
					'tacos',
					'salad',
					'soup',
					'spanish',
					'texmex',
					'steakhouse',
					'foodtrucks'
				];
				return selection(pref, foodSelection, 'food', usedTerms);
				break;
			case 'play':
				let playSelection = [
					'arcades',
					'bars',
					'bingo',
					'book stores',
					'bowling',
					'coffee',
					'escape rooms',
					'laser tag',
					'movies',
					'museums',
					'shopping',
					'spas',
					'trampolines',
					'amusement parks',
					'aquariums',
					'bike rentals',
					'breweries',
					'canoeing',
					'go carts',
					'kayaks',
					'hiking',
					'mini golf',
					'movies',
					'paddle boarding',
					'paint ball',
					'tours',
					'swimming',
					'tubing',
					'zip lining',
					'zoo',
					'wineries'
				];
				return selection(pref, playSelection, 'play', usedTerms);
		}
	};
}
