import { combineReducers } from 'redux';
import userReducer from './userReducer';
import preferenceReducer from './preferenceReducer';

const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferenceReducer

});

export default rootReducer;
