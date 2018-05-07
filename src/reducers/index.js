import { combineReducers } from 'redux';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import preferenceReducer from './preferenceReducer';
import dineReducer from './dineReducer';
import locationReducer from './locationReducer';
import ResultsReducer from './ResultsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferenceReducer,
  loading: loadingReducer,
  dine: dineReducer,
  location: locationReducer,
  results:ResultsReducer

});

export default rootReducer;
