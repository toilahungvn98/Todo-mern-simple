import React from 'react'

import styled from 'styled-components';
import {MdDelete} from 'react-icons/md';


const Li = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding-bottom: .7rem;
    transition: all .3s ease;

    &:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

const BtnWrapper = styled.div`
    & > * {
        font-size: 1.9rem;
        cursor: pointer;
    }
`;

const Btn = styled.span`
    color : ${ ({ theme }) => theme.colors.primary};

    &:not(:last-child) {
        margin-right: .5rem;
    }

    &:hover {
        color : ${ ({ theme }) => theme.colors.black};
    }
`;

const Title = styled.p`
    margin-right: 1rem;
`;


const TodoItem = ({ _id, title ,deleteTodo}) => {
    const handleDelete = () => {
        if(window.confirm('Are you sure to delete?')) {
            deleteTodo(_id)
        }
    };


    return (
        <Li >
            <Title>{title} </Title>
            <BtnWrapper>
            {/* <Btn onClick={() => handleEdit(_id)}><FaEdit /></Btn> */}
            <Btn onClick={handleDelete}><MdDelete /></Btn>
            </BtnWrapper>
        </Li>
    )
}

export default TodoItem;
