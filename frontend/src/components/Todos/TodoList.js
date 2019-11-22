import React from 'react';
import TodoItem from './TodoItem';

import styled from 'styled-components';

const UL = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;
const TodoList = ({todos ,deleteTodos}) => {
    return (
        <UL>
            { 
            !todos || todos.length < 1 ? 
            (<p>Todo empty, please add a todo for you.</p>) :
            todos.map( todo =>  <TodoItem key={todo._id} {...todo}  deleteTodo={deleteTodos} />)  
            }
        </UL>
    )
}

export default TodoList;
