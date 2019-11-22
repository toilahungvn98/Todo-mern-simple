import React , { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import TodoContainer from '../TodoContainer/TodoContainer';
import CreateTodo from '../TodoContainer/CreateTodo';


const H3 = styled.h3`
    text-align: center;
    margin: 1rem 0 2rem 0;
`;

const Dashboard = ({user }) => {

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         getTodo();
    //     }
    // },[getTodo,isAuthenticated]);
    
    return (
        <div>
            <H3>Hello : {user.name}</H3>
            <CreateTodo />
            <TodoContainer />
        </div>
    )
};

const mapStateToProps = state => ({
    user : state.auth.user,
});


export default connect(mapStateToProps,{})(Dashboard);
