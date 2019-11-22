import { 
    TODO_ADD,
    TODO_EDIT,
    TODO_DELETE,
    TODO_LOADING,
    TODO_LOADED,
    TODO_FAIL
} from '../actions/types';

const initialState = {
    todos : [],
    msg : {},
    isLoading : false 
};

const TodoReducer = (state = initialState, action) => {
    switch(action.type) { 
        case TODO_LOADED : 
            return {
                ...state, 
                todos : action.payload,
                isLoading : false
            }
        case TODO_LOADING : 
            return {...state, isLoading : true};
        case TODO_FAIL :
            return {...state, isLoading: false}
        case TODO_ADD :
            return {
                ...state,
                todos : [...state.todos, action.payload.todo],
                msg : action.payload
            };
        case TODO_EDIT :
            return  state.todos.map( todo => (todo._id === action.payload.id ) ? 
                    {   ...state,
                        todos :  action.payload,
                        msg : action.payload
                    } : todo);
                
            
        case TODO_DELETE :
            return {
                ...state,
                todos : state.todos.filter( todo => todo._id !== action.payload)
            }
        default:
            return state;
    }
}

export default TodoReducer;