import { GET_ERRORS, CLEAR_ERRORS } from './types';

//get ERRORS
export const getError = (msg,status,id) => {
    return {
        type : GET_ERRORS,
        payload : { msg, status, id}
    }
};

//clear ERRORS
export const clearError = () => {
    return {
        type : CLEAR_ERRORS
    }
};