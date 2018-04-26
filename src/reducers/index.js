import { combineReducers } from 'redux';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import preferenceReducer from './preferenceReducer';
import dineReducer from './dineReducer';
import locationReducer from './locationReducer';

const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferenceReducer,
  loading: loadingReducer,
  dine: dineReducer,
  location: locationReducer

});

export default rootReducer;
