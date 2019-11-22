import React, { useEffect } from 'react'
import styled from 'styled-components';

import { connect } from 'react-redux';
import history from '../../utils/history';

const HomeWrapper = styled.div`
    max-width: 100%;
    background: rgba(0,0,0,0.2);
`;

const H1 = styled.h1`
    text-align: center;
    margin: 0 0 5rem 0;
`;



const Home = ({ user, isAuthenticated}) => {
    useEffect(() => {
        if (isAuthenticated === true ) {
            history.push('/dashboard');
        }
    },[isAuthenticated]);

    return (
        <HomeWrapper>
            <H1>Register and Login to make todo list</H1>
        </HomeWrapper>
    )
}

const mapStateToProps = state => ({
    user : state.auth.user,
    isAuthenticated : state.auth.isAuthenticated
});


export default connect(mapStateToProps,{})(Home);
