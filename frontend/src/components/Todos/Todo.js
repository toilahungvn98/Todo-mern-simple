import React, { useEffect} from 'react'
import styled from 'styled-components';
import TodoList from './TodoList';



const TodoWrapper = styled.div`
    max-width: 50rem;
    margin: 0 auto;
    background-color:  ${ ({ theme}) => theme.colors.primary2 };
    padding: 2rem 1rem;
`;

const Dot = styled.span`
    font-weight: bold;
    font-size : 15rem;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;


const Todo = ({ todo, getTodo, editTodo,deleteTodo ,isLoading}) => {
    useEffect(() => {
        getTodo();
    },[getTodo])
    return isLoading ? <Dot>...</Dot>
        : (
        <> 
        <TodoWrapper>
            <TodoList todos={todo} deleteTodos={deleteTodo} editTodo={editTodo} />
        </TodoWrapper>
        </>
    )
}

export default Todo;
