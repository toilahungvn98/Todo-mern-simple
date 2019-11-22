import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import TodoReducer from './todoReducers';

export default combineReducers({
    auth : authReducer,
    errors : errorReducer,
    todo : TodoReducer
});