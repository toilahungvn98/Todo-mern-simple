import {
    TODO_ADD,
    TODO_DELETE,
    TODO_EDIT,
    TODO_FAIL,
    TODO_LOADED,
    TODO_LOADING,
} from './types';

import axios from 'axios';
import { getError } from './errorAction';
import setAuthToken from '../utils/setAuthToken';

//loading
export const loadTodo = () => {
    return {
        type : TODO_LOADING
    }
}

//get ToDo
export const getTodo = () => async (dispatch) => {
    dispatch(loadTodo());
    try {
        const fetchTodo = await axios.get('http://localhost:5000/todo');
        if(fetchTodo) {
            dispatch({ 
                type : TODO_LOADED,
                payload : fetchTodo.data
            });
        }
    } catch (err) {
        dispatch(getError(err.response.data, err.response.status));
        dispatch({ type : TODO_FAIL});
    }
};


//add Todo

export const addTodo = (title) => async (dispatch) => {

    // dispatch(loadTodo());
    try {

        const newTodo = await axios.post('http://localhost:5000/todo', title);
        if(newTodo) {
            dispatch({ 
                type : TODO_ADD,
                payload : newTodo.data
            });
        }
    } catch (err) {
        dispatch(getError(err.response.data, err.response.status));
        dispatch({ type : TODO_FAIL});
    }

}
export const editTodo = (id,title) => async (dispatch) => {

    try {

        const editTodo = await axios.put(`http://localhost:5000/todo/${id}`, title);
        if(editTodo) {
            dispatch({ 
                type : TODO_EDIT,
                payload : editTodo.data
            });
        }
    } catch (err) {
        dispatch(getError(err.response.data, err.response.status));
        dispatch({ type : TODO_FAIL});
    }

}

//delete Todo

export const deleteTodo = id => async (dispatch) => {

    try {


        const deleteId = await axios.delete(`http://localhost:5000/todo/${id}`);
        if(deleteId) {
            dispatch({ 
                type : TODO_DELETE,
                payload : id
            });
        }
    } catch (err) {
        dispatch(getError(err.response.data, err.response.status));
        dispatch({ type : TODO_FAIL});
    }
};


