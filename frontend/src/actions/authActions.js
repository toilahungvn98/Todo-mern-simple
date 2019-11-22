import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';
//lib
import axios from 'axios';
import history from '../utils/history';
//action creator
import { getError, clearError } from './errorAction';

//helper functions
import setAuthToken from '../utils/setAuthToken';
//Check token & load user 

export const loadUser = () => async (dispatch, getState) => {
    //User loading
    dispatch({ type : USER_LOADING});
    
    //get Token from localStorage
    const token = getState().auth.token;
    //Headers
    setAuthToken(token);
    try {
        const fetchUser = await axios.get('http://localhost:5000/user');
        if (fetchUser) {
            dispatch({
                type: USER_LOADED,
                payload : fetchUser.data
            })
        }
    } catch (err) {
        dispatch(getError(err.response.data, err.response.status));
        dispatch({ type : AUTH_ERROR });
    }


};

export const registerUser = (userData) => async dispatch => {

    try {
        const addUser = await axios.post('http://localhost:5000/user/register',userData);
        if (addUser) {
            dispatch({
                type : REGISTER_SUCCESS,
                payload : addUser.data
            });
            dispatch(clearError());
        
        }
    } catch (err) {
        dispatch(getError(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({ type : REGISTER_FAIL});
    }


};


export const loginUser = userData => async (dispatch,getState) => {
    try {
        const signIn = await axios.post('http://localhost:5000/auth',userData);
        if (signIn) {

            dispatch({
                type : LOGIN_SUCCESS,
                payload : signIn.data
            });
            dispatch(clearError());
            history.push('/dashboard');
        }
    } catch (err) {
        dispatch(getError(err.response.data, err.response.status, 'LOGIN_FAILED'));
        dispatch({ type : LOGIN_FAIL});
    }
}


export const logoutUser = () => {
    return {type : LOGOUT_SUCCESS };
}


