import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';



const Button = styled.span`
    display : block;
    cursor: pointer;
    font-size: 1.3rem;
    &:hover {
        color : ${({theme}) => theme.colors.primary}
    }
`;

const Logout = ({logoutUser}) => {
    const handleLogout = e => {
        e.preventDefault();
        if( window.confirm('Are you sure to log out?')) {
            logoutUser();
        } else {
            return;
        }
    }
    return (
        <>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    ) 
}

export default connect(null, { logoutUser })(Logout);
